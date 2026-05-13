import addonDocs from "@storybook/addon-docs";
import addonA11y from "@storybook/addon-a11y";
import { definePreview } from "@storybook/react-vite";
import PingoTheme from "./PingoTheme";
import "../src/styles/main.css";
import "../src/styles/docs.css";

export default definePreview({
  parameters: {
    options: {
      storySort: {
        order: ["Design Tokens", "Icons"],
      },
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    layout: "centered",
    backgrounds: {
      options: {
        light: { name: "Light", value: "var(--color-background)" },
      },
    },
    a11y: {
      test: "error",
    },
    docs: {
      theme: PingoTheme,
      toc: {
        headingSelector: "h1, h2, h3",
      },
    },
  },

  tags: ["autodocs"],

  initialGlobals: {
    backgrounds: { value: "light" },
  },

  addons: [addonA11y(), addonDocs()]
});
