import preview from "#.storybook/preview";

import { Button } from "./Button";

const meta = preview.meta({
  component: Button,
});

export const AccentButton = meta.story({
  args: {
    variant: "accent",
    size: "medium",
    children: "Button",
  },
});

export const DefaultButton = meta.story({
  args: {
    variant: "default",
    size: "medium",
    children: "Button",
  },
});
