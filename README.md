[English](README.md) | [Português (BR)](README.pt-BR.md)

# Pingo UI

A React UI library with design tokens, components, and icons.

## Installation

```bash
npm install pingo-ui react react-dom
# or
pnpm add pingo-ui react react-dom
# or
yarn add pingo-ui react react-dom
```

## Usage

Import the CSS in your entry point:

```ts
import "pingo-ui/styles.css";
```

Then use components:

```tsx
import { Button, Input, Card, Icon, Text, Alert } from "pingo-ui";

function Example() {
  return (
    <Card>
      <Text variant="heading">Hello Pingo</Text>
      <Input label="Email" name="email" />
      <Button variant="accent">Get Started</Button>
    </Card>
  );
}
```

## Components

| Component | Description |
|-----------|-------------|
| `Button`  | Action button with `default`/`accent` variants, `medium`/`large` sizes, and destructive state |
| `Input`   | Form input with label and optional error display |
| `Card`    | Content container with padding and border |
| `Text`    | Styled text element |
| `Icon`    | Icon renderer (7 built-in glyphs) |
| `Alert`   | Inline alert for errors, warnings, etc. |

## Tokens

Pingo exposes a comprehensive design token system via CSS custom properties:

- **Colors** — primitives (`blue-100`…`900`, `neutral`, `red`, `green`, `yellow`) and semantic roles (`background-default`, `content-accent`, `border-danger`, etc.)
- **Space** — spacing scale (`100`…`900`)
- **Size** — small, medium, large
- **Radius** — small, medium, large, max
- **Typography** — font sizes (100–500), weights (regular, bold), families (default: Akt, code: Fira Code)

## Development

```bash
pnpm install
pnpm dev          # Start Storybook
pnpm build        # Build library to dist/
pnpm lint         # Lint source files
```
