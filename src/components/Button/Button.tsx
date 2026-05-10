import type { ComponentPropsWithRef, ReactNode } from "react";
import styles from "./Button.module.css";
import { cn } from "@/utils/classNames";

interface ButtonProps extends ComponentPropsWithRef<"button"> {
  /**
   * Button children: can be simple label with support for icon
   */
  children: ReactNode;
  /**
   * The size of the button, determining height, font size and padding
   */
  size?: "medium" | "large";
  /**
   * Style variant, accent buttons should be used only once per page
   */
  variant?: "accent" | "default";
}

/**
 * Main button for user actions, extends all props from `<button>`
 */
export function Button({
  size = "medium",
  variant = "default",
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn([styles.button, styles[size], styles[variant], className])}
      {...props}
    >
      {children}
    </button>
  );
}
