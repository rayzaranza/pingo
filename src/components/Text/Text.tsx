import type { ReactNode } from "react";
import styles from "./Text.module.css";
import { cn } from "@/utils/classNames";

interface TextProps {
  /** The content to be rendered */
  children: ReactNode;
  /** How this text is being used: a heading or a general body text */
  variant?: "heading" | "body";
  /** Size of the text */
  size?: "small" | "medium" | "large";
  /** The HTML tag to be used */
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span" | "b" | "i" | "strong";
  /** Additional class name */
  className?: string;
  /** Color of the text, preferably one of the `color.content` design tokens (css var or ts) */
  color?: string;
}

/**
 * Text component to use for body texts in the ui
 */
export function Text({
  children,
  className,
  as = "span",
  variant = "body",
  size = "medium",
  color = "var(--color-content)",
}: TextProps) {
  const Component = as;
  return (
    <Component
      className={cn([styles.text, styles[variant], styles[size], className])}
      style={{ color }}
    >
      {children}
    </Component>
  );
}
