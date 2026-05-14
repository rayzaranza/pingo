import type { ComponentPropsWithRef } from "react";
import styles from "./Input.module.css";
import { cn } from "@/utils/classNames.ts";
import { Alert } from "../Alert/Alert";

interface InputProps extends ComponentPropsWithRef<"input"> {
  /** The label of the input */
  label: string;
  /** Additional CSS class name */
  className?: string;
  /** Error message for validation */
  error?: string;
  /** Name of the input */
  name: string;
  /** Hides the label visually only */
  showLabel?: boolean;
}

/** Main input for forms and simple fields, extends all props from `<input>` */
export function Input({
  label,
  className,
  error,
  name,
  showLabel = true,
  ...props
}: InputProps) {
  return (
    <div
      className={cn([
        styles.input,
        className,
        error && styles.error,
        !showLabel ? styles.labelHidden : undefined,
      ])}
    >
      <label className={styles.label} htmlFor={name}>
        {label}
      </label>
      <input id={name} name={name} className={styles.field} {...props} />
      {error && <Alert variant="error">{error}</Alert>}
    </div>
  );
}
