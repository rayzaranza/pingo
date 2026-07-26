[English](README.md) | [Português (BR)](README.pt-BR.md)

# Pingo UI

Uma biblioteca de componentes UI para React com tokens de design, ícones e estilos prontos para uso.

## Instalação

```bash
npm install pingo-ui react react-dom
# ou
pnpm add pingo-ui react react-dom
# ou
yarn add pingo-ui react react-dom
```

## Uso

Importe o CSS no arquivo de entrada da sua aplicação:

```ts
import "pingo-ui/styles.css";
```

Em seguida, utilize os componentes:

```tsx
import { Button, Input, Card, Icon, Text, Alert } from "pingo-ui";

function Exemplo() {
  return (
    <Card>
      <Text variant="heading">Olá Pingo</Text>
      <Input label="E-mail" name="email" />
      <Button variant="accent">Começar</Button>
    </Card>
  );
}
```

## Componentes

| Componente | Descrição |
|------------|-----------|
| `Button`   | Botão de ação com variantes `default`/`accent`, tamanhos `medium`/`large` e estado destrutivo |
| `Input`    | Campo de formulário com rótulo e exibição opcional de erro |
| `Card`     | Container de conteúdo com espaçamento e borda |
| `Text`     | Elemento de texto estilizado |
| `Icon`     | Renderizador de ícones (7 glifos embutidos) |
| `Alert`    | Alerta inline para erros, avisos, etc. |

## Tokens

O Pingo expõe um sistema abrangente de tokens de design por meio de variáveis CSS:

- **Cores** — primitivas (`blue-100`…`900`, `neutral`, `red`, `green`, `yellow`) e funções semânticas (`background-default`, `content-accent`, `border-danger`, etc.)
- **Espaçamento** — escala de espaçamento (`100`…`900`)
- **Tamanho** — small, medium, large
- **Border radius** — small, medium, large, max
- **Tipografia** — tamanhos de fonte (100–500), pesos (regular, bold), famílias (padrão: Akt, código: Fira Code)

## Desenvolvimento

```bash
pnpm install
pnpm dev          # Iniciar o Storybook
pnpm build        # Compilar a biblioteca para dist/
pnpm lint         # Verificar o código fonte com ESLint
```
