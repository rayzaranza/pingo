// plugins/extract-fonts.ts
// Vite lib mode always inlines assets as base64 regardless of assetsInlineLimit.
// This plugin runs after the bundle is written, pulls font data URIs out of the
// CSS, writes them as real files, and rewrites the CSS references.

import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { resolve } from "node:path";
import { createHash } from "node:crypto";
import type { Plugin, ResolvedConfig } from "vite";

const FONT_DATA_URI = /url\("?(data:font\/[\w+]+;base64,[A-Za-z0-9+/=]+)"?\)/g;

export function extractFonts(): Plugin {
  let config: ResolvedConfig;

  return {
    name: "pingo-extract-fonts",
    apply: "build",

    configResolved(resolved) {
      config = resolved;
    },

    closeBundle() {
      const outDir = config.build.outDir ?? "dist";
      const cssPath = resolve(outDir, "pingo.css");

      let css: string;
      try {
        css = readFileSync(cssPath, "utf-8");
      } catch {
        // no CSS output — nothing to do
        return;
      }

      const fontsDir = resolve(outDir, "fonts");
      mkdirSync(fontsDir, { recursive: true });

      const replaced = css.replace(FONT_DATA_URI, (_match, dataUri) => {
        const [header, base64] = dataUri.split(",");
        const mimeType = header.replace("data:", "").replace(";base64", "");
        const ext = mimeToExt(mimeType);
        const buffer = Buffer.from(base64, "base64");
        const hash = createHash("sha256")
          .update(buffer)
          .digest("hex")
          .slice(0, 8);
        const fileName = `${hash}.${ext}`;
        const filePath = resolve(fontsDir, fileName);

        writeFileSync(filePath, buffer);
        console.log(`  ✓ extracted font → fonts/${fileName}`);

        return `url("./fonts/${fileName}")`;
      });

      if (replaced !== css) {
        writeFileSync(cssPath, replaced, "utf-8");
        console.log("  ✓ pingo.css font references rewritten");
      }
    },
  };
}

function mimeToExt(mime: string): string {
  const map: Record<string, string> = {
    "font/woff2": "woff2",
    "font/woff": "woff",
    "font/ttf": "ttf",
    "font/otf": "otf",
    "application/font-woff": "woff",
    "application/font-woff2": "woff2",
  };
  return map[mime] ?? "font";
}
