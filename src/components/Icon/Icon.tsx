import type { SVGAttributes } from "react";
import { icons, type IconName } from "./icons";
import styles from "./Icon.module.css";

interface IconProps extends SVGAttributes<SVGElement> {
  name: IconName;
  color?: string;
  size?: number | string;
  label?: string;
}

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
