import type { Preview } from "@storybook/react-vite";
import PingoTheme from "./PingoTheme";
import "../src/styles/main.css";
import "../src/styles/docs.css";

const preview: Preview = {
  parameters: {
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
    },
  },
  tags: ["autodocs"],
  initialGlobals: {
    backgrounds: { value: "light" },
  },
};

export default preview;
