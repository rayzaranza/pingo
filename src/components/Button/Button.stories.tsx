import preview from "#.storybook/preview";

import { Button } from "./Button";

const meta = preview.meta({
  component: Button,
});

export const Default = meta.story({
  args: {
    variant: "default",
    size: "medium",
    children: "Button",
    destructive: false,
    active: false,
  },
});

export const Accent = meta.story({
  args: {
    variant: "accent",
    size: "medium",
    children: "Button",
    destructive: false,
  },
});

export const Destructive = meta.story({
  args: {
    destructive: true,
    variant: "default",
    size: "medium",
    children: "Button",
  },
});

export const DestructiveAccent = meta.story({
  args: {
    destructive: true,
    variant: "accent",
    size: "medium",
    children: "Button",
  },
});

export const Active = meta.story({
  args: {
    variant: "default",
    size: "medium",
    children: "Button",
    active: true,
  },
});
