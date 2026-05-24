import { create } from "storybook/theming";
import { font, color } from "../src/tokens/tokens-resolved.ts";
import logo from "./public/logo.svg";

export default create({
  base: "light",
  brandImage: logo,
  fontBase: font.family.default,
  fontCode: font.family.code,
  appBg: color.background.default,
  appPreviewBg: color.background.default,
  appContentBg: color.background.default,
  barBg: color.background.default,
  inputBg: color.background.default,
  buttonBg: color.background.default,
  textColor: color.content.default,
  appHoverBg: color.background.hover,
  colorPrimary: color.background.accent.default,
  textMutedColor: color.content.secondary,
});
