import type { SVGAttributes } from "react";
import { icons, type IconName } from "./icons";
import styles from "./Icon.module.css";

interface IconProps extends SVGAttributes<SVGElement> {
  /** Name of the icon */
  name: IconName;
  /** Color of the icon, should be eith `currentColor` (default) or a `color-content` token */
  color?: string;
  /** Size of the icon, fixed size as number or a string (e.g. 100%, 1rem, etc) */
  size?: number | string;
  /** If the icon is not decorative, it should have a label for screen-readers */
  label?: string;
}

/** Icon component to be rendered as inline SVG, based on the name */
export function Icon({
  name,
  label,
  size = 24,
  color = "currentColor",
  ...props
}: IconProps) {
  const Glyph = icons[name];
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      stroke={color}
      className={styles.icon}
      {...(label
        ? { role: "img", "aria-label": label }
        : { "aria-hidden": true })}
      {...props}
    >
      <Glyph />
    </svg>
  );
}
