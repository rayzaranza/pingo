export function cn(classes: (string | undefined)[]) {
  return classes.filter((c) => c !== undefined).join(" ");
}
