import preview from "#.storybook/preview.ts";
import { Input } from "./Input";

const meta = preview.meta({ component: Input });

export const Default = meta.story({
  args: {
    label: "Label",
    name: "input",
  },
});

export const WithError = meta.story({
  args: {
    label: "Label",
    name: "input",
    error: "Email is required",
  },
});

export const LabelHidden = meta.story({
  args: {
    name: "input",
    label: "Label",
    showLabel: false,
  },
});
