import styles from "./Alert.module.css";
import type { ReactNode } from "react";
import classNames from "classnames";
import { Icon } from "@/components/Icon/Icon";
import type { IconName } from "@/components/Icon/icons";

const cx = classNames.bind(styles);

interface AlertProps {
  /** Alert message */
  children: ReactNode;
  /** The style variant of the alert, setting color and icon */
  variant?: "success" | "error" | "warning" | "info";
  /** Additional CSS class name */
  className?: string;
  /** Inline variant without background and border */
  inline?: boolean;
}

/** Displays an inline message to the user with a semantic meaning */
export function Alert({
  children,
  variant = "info",
  inline = false,
  className,
}: AlertProps) {
  function getIconName(): IconName {
    switch (variant) {
      case "error":
        return "x-circle";
      case "success":
        return "check-circle";
      case "warning":
        return "alert-triangle";
      default:
        return "alert-circle";
    }
  }

  return (
    <div
      className={cx(
        styles.alert,
        styles[variant],
        inline && styles.inline,
        className,
      )}
    >
      <Icon name={getIconName()} />
      {children}
    </div>
  );
}
