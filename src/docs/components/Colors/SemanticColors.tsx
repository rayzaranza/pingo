import styles from "./SemanticColors.module.css";
import { color } from "@/tokens/tokens-docs";
import { Text } from "@/components/Text/Text";

interface SemanticToken {
  name: string;
  value: string;
  cssVariable: string;
  description: string;
}

function Row({ name, description, cssVariable, value }: SemanticToken) {
  return (
    <tr className={styles.row}>
      <th scope="row">
        <div className={styles.rowHeader}>
          <div
            className={styles.swatch}
            style={{ backgroundColor: cssVariable }}
          />
          <div>
            <Text className={styles.colorName}>{name}</Text>
            <Text size="small" color={color.content.secondary.cssVariable}>
              {description}
            </Text>
          </div>
        </div>
      </th>
      <td>
        <code className={styles.colorValue}>{value}</code>
      </td>
      <td>
        <code className={styles.cssVariable}>{cssVariable}</code>
      </td>
    </tr>
  );
}

export function SemanticColors({
  category,
}: {
  category:
    | typeof color.background
    | typeof color.border
    | typeof color.content;
}) {
  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th scope="col">
            <Text size="small">Token</Text>
          </th>
          <th scope="col">
            <Text size="small">Value</Text>
          </th>
          <th scope="col">
            <Text size="small">CSS Variable</Text>
          </th>
        </tr>
      </thead>

      <tbody>
        {Object.values(category).map((token) => {
          if ("value" in token) {
            return (
              <Row
                key={token.name}
                name={token.name}
                description={token.description}
                cssVariable={token.cssVariable}
                value={token.value}
              />
            );
          }
          return Object.values(token).map(
            ({ name, description, cssVariable, value }) => (
              <Row
                key={name}
                name={name}
                description={description}
                cssVariable={cssVariable}
                value={value}
              />
            ),
          );
        })}
      </tbody>
    </table>
  );
}
