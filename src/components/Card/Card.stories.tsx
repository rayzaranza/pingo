import preview from "#.storybook/preview.ts";
import { Card } from "./Card";

const meta = preview.meta({
  component: Card,
  args: {
    title: "Card title",
    image: "https://placecats.com/400/400",
    imageAlt: "heree kitteeen pspspsps",
  },
});

export const Default = meta.story();

export const WithLink = meta.story({
  args: {
    href: "/?path=/story/components-card--with-link",
  },
});

export const WithSubtitle = meta.story({
  args: {
    subtitle: "Subtitle",
  },
});
