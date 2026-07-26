import { Text } from "@/components/Text/Text";
import { color } from "@/tokens/tokens-docs";
import styles from "./PrimitiveColors.module.css";

type PrimitiveColor = typeof color.neutral;
type ColorScale = keyof PrimitiveColor;

const scales = Object.keys(color.neutral) as ColorScale[];

const primitiveColors: Record<string, PrimitiveColor> = {
  neutral: color.neutral,
  blue: color.blue,
  red: color.red,
  green: color.green,
  yellow: color.yellow,
};

function Row({ name }: { name: string }) {
  return (
    <tr>
      <th scope="row">{<Text>{name}</Text>}</th>

      {scales.map((scale) => (
        <td key={scale} className={styles.cell}>
          <div
            className={styles.swatch}
            style={{
              backgroundColor: primitiveColors[name][scale].value,
            }}
          />
        </td>
      ))}
    </tr>
  );
}

export function PrimitiveColors() {
  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th scope="col"></th>
          {scales.map((scale) => (
            <th scope="col" key={scale}>
              <Text size="small">{scale}</Text>
            </th>
          ))}
        </tr>
      </thead>

      <tbody>
        {Object.keys(primitiveColors).map((key) => (
          <Row key={key} name={key} />
        ))}
      </tbody>
    </table>
  );
}
