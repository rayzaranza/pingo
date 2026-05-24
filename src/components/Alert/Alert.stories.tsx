import preview from "#.storybook/preview.ts";
import { Alert } from "./Alert";

const meta = preview.meta({ component: Alert });

export const Error = meta.story({
  args: {
    children: "Email is required",
    variant: "error",
  },
});

export const Success = meta.story({
  args: {
    children: "This is email is available",
    variant: "success",
  },
});

export const Warning = meta.story({
  args: {
    children: "Your email is not verified yet",
    variant: "warning",
  },
});

export const Info = meta.story({
  args: {
    children: "Asset list were moved to your profile",
    variant: "info",
  },
});

export const Inline = meta.story({
  args: {
    children: "Email is required",
    variant: "error",
    inline: true,
  },
});
