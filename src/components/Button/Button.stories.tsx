import type { Meta, StoryObj } from "@storybook/react-vite";

import { Button } from "./Button";

const meta = {
  component: Button,
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AccentButton: Story = {
  args: {
    variant: "accent",
    size: "medium",
    children: "Button",
  },
};

export const DefaultButton: Story = {
  args: {
    variant: "default",
    size: "medium",
    children: "Button",
  },
};
