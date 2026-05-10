import { create } from "storybook/theming/create";
import { fontFamily, semantic } from "../src/styles/tokens.ts";

const bg = semantic.color.background.default;

export default create({
  base: "light",
  brandTitle: "<h1><b>Pingo</b></h1>",
  fontBase: fontFamily,
  fontCode: "Fira Code",
  appBg: bg,
  appPreviewBg: bg,
  appContentBg: bg,
  barBg: bg,
  inputBg: bg,
  buttonBg: bg,
  textColor: semantic.color.content.default,
  appHoverBg: semantic.color.background.hover,
  colorPrimary: semantic.color.background.accent,
  textMutedColor: semantic.color.content.secondary,
});
