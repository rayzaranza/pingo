import preview from "#.storybook/preview.ts";
import { Alert } from "./Alert";

const meta = preview.meta({ component: Alert });

export const AlertSuccess = meta.story({
  args: {
    children: "This is email is available",
    variant: "success",
  },
});

export const AlertDanger = meta.story({
  args: {
    children: "Email is required",
    variant: "error",
  },
});

export const AlertWarning = meta.story({
  args: {
    children: "Your email is not verified yet",
    variant: "warning",
  },
});

export const AlertInfo = meta.story({
  args: {
    children: "Asset list were moved to your profile",
    variant: "info",
  },
});
