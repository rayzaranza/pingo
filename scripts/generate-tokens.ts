import { readFileSync, readdirSync, writeFileSync } from "node:fs";
import path from "node:path";
import type { FigmaTokenObject } from "./figma-types";
import { unflatten } from "flat";

const baseDir = import.meta.dirname;

interface Token {
  name: string;
  value: string;
  description?: string;
}

function isAlias(value: string) {
  return value.startsWith("{") && value.endsWith("}");
}

function formatValueUnit(token: FigmaTokenObject) {
  for (const scope of token.$extensions["com.figma.scopes"]) {
    switch (scope) {
      case "FONT_SIZE":
      case "GAP":
      case "WIDTH_HEIGHT":
        return `${Number(token.$value) / 16}rem`;
      case "CORNER_RADIUS":
        return `${token.$value}px`;
      default:
        return token.$value.toString();
    }
  }
  return token.$value.toString();
}

function formatValue(token: FigmaTokenObject) {
  if (typeof token.$value === "object" && "hex" in token.$value) {
    return token.$value.hex;
  }
  return formatValueUnit(token);
}

function extractTokens(
  tokenObject: FigmaTokenObject,
  prefix: string[] = [],
  result: Token[] = [],
) {
  if ("$value" in tokenObject) {
    result.push({
      name: prefix.filter((p) => p !== "$root").join("."),
      value: formatValue(tokenObject),
      ...(tokenObject.$description && {
        description: tokenObject.$description,
      }),
    });
    return result;
  }
  for (const [key, value] of Object.entries(tokenObject)) {
    if (key === "$extensions") continue;
    extractTokens(value as FigmaTokenObject, [...prefix, key], result);
  }
  return result;
}

function getTokensFromFile(path: string) {
  const file = readFileSync(path, "utf-8");
  const tokens = extractTokens(JSON.parse(file));
  return tokens;
}

function formatCssVariableAlias(value: string) {
  return `var(--${value.replace("{", "").replace("}", "").replaceAll(".", "-")})`;
}

function generateCss(filePath: string, tokens: Token[]) {
  let css = ":root {\n";
  for (const token of tokens) {
    const name = token.name.replaceAll(".", "-");
    const value = isAlias(token.value)
      ? formatCssVariableAlias(token.value)
      : token.value;
    css += `  --${name}: ${value};\n`;
  }
  css += "}\n";
  writeFileSync(path.join(baseDir, "../src/styles", filePath), css);
  console.info(`✅ ${filePath} generated.`);
}

function resolveValue(value: string, tokens: Token[]) {
  if (isAlias(value)) {
    const token = tokens.find(({ name }) => `{${name}}` === value);
    return token?.value;
  }
  return value;
}

function convertKebabToCamelCase(value: string) {
  return value
    .split("-")
    .map((word, index) => {
      if (index === 0) {
        return word;
      }
      return word.slice(0, 1).toUpperCase() + word.slice(1);
    })
    .join("");
}

function generateJs(
  filePath: string,
  tokens: Token[],
  output?: "docs" | "cssVars" | "resolved",
) {
  const tokensObject = Object.fromEntries(
    tokens.map(({ name, value, description }) => {
      const formattedName = name.includes("-")
        ? convertKebabToCamelCase(name)
        : name;
      switch (output) {
        case "docs":
          return [
            formattedName,
            {
              name,
              value,
              description,
              cssVariable: formatCssVariableAlias(name),
            },
          ];
        case "cssVars":
          return [formattedName, formatCssVariableAlias(name)];
        case "resolved":
          return [formattedName, resolveValue(value, tokens)];
        default:
          return [formattedName, value];
      }
    }),
  );

  const tokensNested: object = unflatten(tokensObject, { object: true });
  const groups = Object.keys(tokensNested);

  let fileContent = "";
  for (const group of groups) {
    const tokensString = JSON.stringify(
      tokensNested[group as keyof object],
      null,
      2,
    );
    fileContent += `export const ${group} = ${tokensString};\n\n`;
  }
  writeFileSync(path.join(baseDir, "../src/tokens", filePath), fileContent);
  console.info(`✅ ${filePath} generated.`);
}

function getTokensFromFolder(dir: string) {
  const fileNames = readdirSync(dir).filter(
    (file) => path.extname(file) === ".json",
  );
  const allTokens = [];
  for (const fileName of fileNames) {
    const tokens = getTokensFromFile(path.join(dir, fileName));
    allTokens.push(...tokens);
  }
  return allTokens;
}

function generateFiles() {
  const tokens = getTokensFromFolder("tokens");
  generateCss("tokens.css", tokens);
  generateJs("tokens-vars.ts", tokens, "cssVars");
  generateJs("tokens-resolved.ts", tokens, "resolved");
  generateJs("tokens-docs.ts", tokens, "docs");
}

generateFiles();
