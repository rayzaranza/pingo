import { Icon } from "./Icon";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta = { component: Icon } satisfies Meta<typeof Icon>;
type Story = StoryObj<typeof meta>;
export default meta;

export const Default: Story = {
  args: {
    name: "arrow-left",
  },
};
