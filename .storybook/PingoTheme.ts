import { create } from "storybook/theming";
import { font, color } from "../src/styles/tokens.ts";

const bg = color.background.default;

export default create({
  base: "light",
  brandTitle: "<h1><b>Pingo</b></h1>",
  fontBase: font.family.default,
  fontCode: font.family.monospace,
  appBg: bg,
  appPreviewBg: bg,
  appContentBg: bg,
  barBg: bg,
  inputBg: bg,
  buttonBg: bg,
  textColor: color.content.default,
  appHoverBg: color.background.hover,
  colorPrimary: color.background.accent.default,
  textMutedColor: color.content.secondary,
});
