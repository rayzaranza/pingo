import preview from "#.storybook/preview";
import { Icon } from "./Icon";

const meta = preview.meta({ component: Icon });

export const Default = meta.story({
  args: {
    name: "arrow-left",
  },
});
