import { Text } from "./Text";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta = { component: Text } satisfies Meta<typeof Text>;
type Story = StoryObj<typeof meta>;
export default meta;

export const Default: Story = {
  args: {
    children: "Text",
  },
};

export const Body: Story = {
  args: {
    children: "Body",
    variant: "body",
    size: "medium",
  },
};

export const Heading: Story = {
  args: {
    children: "Heading",
    variant: "heading",
    size: "large",
  },
};
