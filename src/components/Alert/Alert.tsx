import styles from "./Alert.module.css";
import type { ReactNode } from "react";
import { cn } from "@/utils/classNames.ts";
import { Icon } from "@/components/Icon/Icon";
import type { IconName } from "@/components/Icon/icons";

interface AlertProps {
  /** Alert message */
  children: ReactNode;
  /** The style variant of the alert, setting color and icon */
  variant?: "success" | "error" | "warning" | "info";
  /** Additional CSS class name */
  className?: string;
}

/** Displays an inline message to the user with a semantic meaning */
export function Alert({ children, variant = "info", className }: AlertProps) {
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
    <div className={cn([styles.alert, styles[variant], className])}>
      <Icon name={getIconName()} />
      {children}
    </div>
  );
}
