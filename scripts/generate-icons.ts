// scripts/generate-icons.ts
// Reads SVGs from src/assets/icons/, optimizes them, and outputs:
//   - src/components/Icon/glyphs/*.tsx  (one per icon)
//   - src/components/Icon/icons.ts      (registry + IconName type)
// Run: npx tsx scripts/generate-icons.ts

import {
  readFileSync,
  writeFileSync,
  readdirSync,
  mkdirSync,
  rmSync,
} from "node:fs";
import { resolve, dirname, basename } from "node:path";
import { fileURLToPath } from "node:url";
import { optimize } from "svgo";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ICONS_SRC = resolve(__dirname, "../src/assets/icons");
const GLYPHS_OUT = resolve(__dirname, "../src/components/Icon/glyphs");
const REGISTRY = resolve(__dirname, "../src/components/Icon/icons.ts");

// Clear and recreate glyphs dir so deleted SVGs don't leave stale components
rmSync(GLYPHS_OUT, { recursive: true, force: true });
mkdirSync(GLYPHS_OUT, { recursive: true });

// ── Name helpers ──────────────────────────────────────────────────────────────

// "Arrow Left" | "Arrow-Left" | "ArrowLeft" → "arrow-left"
function toKebab(name: string): string {
  return name
    .trim()
    .replace(/([a-z])([A-Z])/g, "$1-$2") // camelCase → camel-case
    .replace(/[\s_]+/g, "-") // spaces/underscores → hyphens
    .replace(/-+/g, "-") // collapse multiple hyphens
    .toLowerCase();
}

// "Arrow Left" | "arrow-left" | "Arrow-Left" → "ArrowLeft"
function toPascal(name: string): string {
  return name
    .trim()
    .split(/[\s\-_]+/)
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1).toLowerCase())
    .join("");
}

// ── Attribute stripping ───────────────────────────────────────────────────────

// Reconstructs each SVG element keeping ONLY the d attribute.
// Whitelist approach — nothing leaks through by accident.
function keepOnlyD(svg: string): string {
  return svg.replace(/<(\w+)([^>]*?)(\/?>)/g, (_, tag, attrs, close) => {
    const d = attrs.match(/\bd="([^"]*)"/);
    return d ? `<${tag} d="${d[1]}"${close}` : `<${tag}${close}`;
  });
}

// ── Process files ─────────────────────────────────────────────────────────────

const files = readdirSync(ICONS_SRC)
  .filter((f) => f.endsWith(".svg"))
  .sort();

const imports: string[] = [];
const registry: string[] = [];

for (const file of files) {
  const raw = readFileSync(resolve(ICONS_SRC, file), "utf-8");
  const stem = basename(file, ".svg"); // e.g. "Arrow Left"
  const kebab = toKebab(stem); // "arrow-left"
  const pascal = toPascal(stem); // "ArrowLeft"
  const glyphFile = resolve(GLYPHS_OUT, `${pascal}.tsx`);

  // Strip <svg> wrapper, keep inner elements only
  const inner = raw
    .replace(/<\?xml[^>]*\?>/g, "")
    .replace(/<!DOCTYPE[^>]*>/g, "")
    .replace(/<svg[^>]*>/g, "")
    .replace(/<\/svg>/g, "")
    .trim();

  // Optimize with SVGO
  const { data } = optimize(`<svg>${inner}</svg>`, {
    plugins: ["preset-default", "removeDimensions"],
  });

  // Strip all styling attributes — Icon component handles presentation
  const optimized = keepOnlyD(
    data
      .replace(/<svg[^>]*>/g, "")
      .replace(/<\/svg>/g, "")
      .trim(),
  );

  const topLevelCount = (optimized.match(/<\w+/g) ?? []).length;
  const body = topLevelCount > 1 ? `<>${optimized}</>` : optimized;

  writeFileSync(
    glyphFile,
    `// Auto-generated — do not edit manually.\nexport function ${pascal}() {\n  return ${body}\n}\n`,
    "utf-8",
  );

  imports.push(`import { ${pascal} } from "./glyphs/${pascal}"`);
  registry.push(`  "${kebab}": ${pascal}`);
}

// ── Write registry ────────────────────────────────────────────────────────────

const registryContent = [
  "// Auto-generated — do not edit manually.",
  ...imports,
  "",
  "export const icons = {",
  ...registry.map((r) => `${r},`),
  "} as const",
  "",
  "export type IconName = keyof typeof icons",
  "",
].join("\n");

writeFileSync(REGISTRY, registryContent, "utf-8");
console.log(`✓  ${files.length} icon(s) generated`);
console.log(registry.map((r) => `   ${r.trim()}`).join("\n"));
