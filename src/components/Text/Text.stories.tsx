import preview from "#.storybook/preview";
import { Text } from "./Text";

const meta = preview.meta({ component: Text });

export const Default = meta.story({
  args: {
    children: "Text",
  },
});

export const Body = meta.story({
  args: {
    children: "Body",
    variant: "body",
    size: "medium",
  },
});

export const Heading = meta.story({
  args: {
    children: "Heading",
    variant: "heading",
    size: "large",
  },
});
