import { Text } from "@/components/Text/Text";
import styles from "./Card.module.css";

interface CardProps {
  /** Card title */
  title: string;
  /** Optional subtitle */
  subtitle?: string;
  /** The cover of the card */
  image: string;
  /** Accessible description of the cover image */
  imageAlt: string;
  /** Provide a link if the card points to another page */
  href?: string;
}

/** Self contained element with a image and title */
export function Card({ title, subtitle, image, imageAlt, href }: CardProps) {
  return (
    <article className={styles.card}>
      <img src={image} className={styles.image} alt={imageAlt} />
      <div className={styles.content}>
        <Text as="h2" size="large">
          {href ? (
            <a href={href} className={styles.link}>
              {title}
            </a>
          ) : (
            title
          )}
        </Text>
        {subtitle && (
          <Text
            variant="body"
            size="small"
            color="var(--color-content-secondary)"
          >
            {subtitle}
          </Text>
        )}
      </div>
    </article>
  );
}
