// This script is enerated by Claude

import { readFileSync, writeFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const SRC = resolve(__dirname, "./tokens.json");
const OUT = resolve(__dirname, "../styles/tokens.ts");

// ── DTCG types ────────────────────────────────────────────────────────────────

type DimensionValue = { value: number; unit: string };
type RawTokenValue = string | number | DimensionValue;

interface TokenNode {
  $value: RawTokenValue;
  $type?: string;
  $description?: string;
  [key: string]: TokenNode | RawTokenValue | string | undefined;
}

interface GroupNode {
  [key: string]: TokenNode | GroupNode | RawTokenValue | string | undefined;
}

type ExtractedValue = string | number | ExtractedObject;
interface ExtractedObject {
  [key: string]: ExtractedValue;
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function resolveDimension({ value, unit }: DimensionValue): string {
  return `${value}${unit}`;
}

function resolveRef(ref: string, root: GroupNode): ExtractedValue {
  const path = ref.slice(1, -1).split(".");
  let node: GroupNode | TokenNode | RawTokenValue | undefined = root;

  for (const key of path) {
    if (typeof node !== "object" || node === null) {
      throw new Error(`Unresolved token reference: ${ref}`);
    }
    node = (node as GroupNode)[key] as
      | GroupNode
      | TokenNode
      | RawTokenValue
      | undefined;
  }

  if (typeof node !== "object" || node === null || !("$value" in node)) {
    throw new Error(`Reference does not point to a token: ${ref}`);
  }

  return resolveValue((node as TokenNode).$value, root);
}

function resolveValue(value: RawTokenValue, root: GroupNode): ExtractedValue {
  if (typeof value === "string" && value.startsWith("{")) {
    return resolveRef(value, root);
  }
  if (typeof value === "object" && "unit" in value) {
    return resolveDimension(value);
  }
  return value;
}

// Recursively walks a DTCG node tree into plain JS values.
// Root tokens (nodes with $value AND non-$ children) become { default: value, ...children }.
function extract(node: TokenNode | GroupNode, root: GroupNode): ExtractedValue {
  if (typeof node !== "object" || node === null) return node as ExtractedValue;

  const isToken = "$value" in node;
  const children = Object.entries(node).filter(([k]) => !k.startsWith("$")) as [
    string,
    TokenNode | GroupNode,
  ][];

  if (isToken && children.length === 0) {
    return resolveValue((node as TokenNode).$value, root);
  }

  if (isToken && children.length > 0) {
    const result: ExtractedObject = {
      default: resolveValue((node as TokenNode).$value, root),
    };
    for (const [key, child] of children) {
      result[key] = extract(child, root);
    }
    return result;
  }

  const result: ExtractedObject = {};
  for (const [key, child] of children) {
    result[key] = extract(child, root);
  }
  return result;
}

// ── Extract ───────────────────────────────────────────────────────────────────

const raw = JSON.parse(readFileSync(SRC, "utf-8")) as GroupNode;

const font = extract(raw.font as GroupNode, raw) as ExtractedObject;
const space = extract(raw.space as GroupNode, raw) as ExtractedObject;
const size = extract(raw.size as GroupNode, raw) as ExtractedObject;
const radius = extract(raw.radius as GroupNode, raw) as ExtractedObject;
const color = extract(raw.color as GroupNode, raw) as ExtractedObject;

// ── Serializer ────────────────────────────────────────────────────────────────

function serialize(value: ExtractedValue, depth = 0): string {
  const pad = "  ".repeat(depth);
  const innerPad = "  ".repeat(depth + 1);

  if (typeof value === "string") return `"${value}"`;
  if (typeof value === "number") return String(value);

  const entries = Object.entries(value);
  if (entries.length === 0) return "{}";

  const lines = entries.map(([k, v]) => {
    const key = /^\d|[^a-zA-Z0-9_$]/.test(k) ? `"${k}"` : k;
    return `${innerPad}${key}: ${serialize(v, depth + 1)}`;
  });

  return `{\n${lines.join(",\n")}\n${pad}}`;
}

// ── Output ────────────────────────────────────────────────────────────────────

const output = `\
// Auto-generated from tokens.json — do not edit manually.
// Run: npx tsx scripts/generate-tokens.ts

export const font = ${serialize(font)} as const;

export const space = ${serialize(space)} as const;

export const size = ${serialize(size)} as const;

export const radius = ${serialize(radius)} as const;

export const color = ${serialize(color)} as const;
`;

writeFileSync(OUT, output, "utf-8");
console.log(`tokens.ts written to ${OUT}`);
