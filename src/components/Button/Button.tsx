import type { ComponentPropsWithRef, ReactNode } from "react";
import styles from "./Button.module.css";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

interface ButtonProps extends ComponentPropsWithRef<"button"> {
  /** Button children: can be a simple label and/or a icon */
  children: ReactNode;
  /** The size of the button, determining height, font size and padding*/
  size?: "medium" | "large";
  /** Style variant, accent buttons should be used only once per page */
  variant?: "accent" | "default";
  /** When the action is destructive or dangerous, like deleting a resource */
  destructive?: boolean;
  /** Sets the state of the button to active/selected */
  active?: boolean;
}

/**
 * Main button for user actions, extends all props from `<button>`
 */
export function Button({
  size = "medium",
  variant = "default",
  destructive = false,
  active = false,
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cx(
        styles.button,
        styles[size],
        styles[variant],
        destructive && styles.destructive,
        active && styles.active,
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
