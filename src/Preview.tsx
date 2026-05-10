import { Button } from "@/components/Button/Button";

export function Preview() {
  return (
    <div style={{ maxWidth: 1024, marginInline: "auto" }}>
      <h1>Pingo</h1>
      <Button>Default</Button>
      <Button variant="accent">Accent</Button>
      <hr />
      <Button size="large">Default</Button>
      <Button size="large" variant="accent">
        Accent
      </Button>
    </div>
  );
}
