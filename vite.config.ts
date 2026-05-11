/// <reference types="vitest/config" />
import { defineConfig } from "vite";
import react, { reactCompilerPreset } from "@vitejs/plugin-react";
import babel from "@rolldown/plugin-babel";
import { storybookTest } from "@storybook/addon-vitest/vitest-plugin";
import { playwright } from "@vitest/browser-playwright";
import { resolve } from "node:path";
import dts from "unplugin-dts/vite";
import { extractFonts } from "./plugins/extractFonts";

export default defineConfig({
  build: {
    lib: {
      entry: "src/main.ts",
      name: "Pingo",
      fileName: "pingo",
      formats: ["es"],
    },
    rolldownOptions: {
      external: [
        "react",
        "react-dom",
        "react/jsx-runtime",
        "react/compiler-runtime",
      ],
    },
  },
  resolve: {
    alias: {
      "@": resolve(import.meta.dirname, "src"),
    },
  },
  plugins: [
    react(),
    dts({
      bundleTypes: true,
      tsconfigPath: "./tsconfig.app.json",
    }),
    babel({
      presets: [reactCompilerPreset()],
    }),
    extractFonts(),
  ],
  test: {
    projects: [
      {
        extends: true,
        plugins: [
          storybookTest({
            configDir: resolve(import.meta.dirname, ".storybook"),
          }),
        ],
        test: {
          name: "storybook",
          browser: {
            enabled: true,
            headless: true,
            provider: playwright({}),
            instances: [
              {
                browser: "chromium",
              },
            ],
          },
        },
      },
    ],
  },
});
