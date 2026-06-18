import type { Product } from "../types";
import { useBundle } from "../state/BundleContext";
import { getQuantity } from "../lib/pricing";
import { getVariant, hasVariants } from "../data/catalog";
import { Icon, type IconName } from "./icons";
import { Price } from "./Price";
import { QuantityStepper } from "./QuantityStepper";
import { VariantSelector } from "./VariantSelector";
import styles from "./ProductCard.module.css";

interface ProductCardProps {
  product: Product;
}

/**
 * A single selectable product. Fully data-driven from the catalog: badge,
 * image, title, description, "Learn More" link, colour variants, quantity
 * stepper and pricing are all rendered conditionally from the product data.
 *
 * A card with a quantity above zero enters its "selected" state (highlighted
 * border). For variant products the stepper is bound to the active variant, and
 * the variant chips each manage their own count.
 */
export function ProductCard({ product }: ProductCardProps) {
  const { state, increment } = useBundle();

  const variant = getVariant(product, state.activeVariant[product.id]);
  const activeVariantId = variant?.id;
  const quantity = getQuantity(state, product, activeVariantId);
  const selected = quantity > 0;

  const unitActive = product.free ? 0 : product.price;

  return (
    <article
      className={`${styles.card} ${selected ? styles.selected : ""}`}
      aria-label={product.name}
      data-selected={selected || undefined}
    >
      <div className={styles.media}>
        {product.badge && <span className={styles.badge}>{product.badge}</span>}
        {product.required && <span className={styles.required}>Required</span>}
        <Icon name={product.icon as IconName} size={56} className={styles.mediaIcon} />
      </div>

      <div className={styles.body}>
        <div className={styles.heading}>
          <h3 className={styles.title}>{product.name}</h3>
          {product.recurring && <span className={styles.recurringTag}>Subscription</span>}
        </div>

        <p className={styles.desc}>
          {product.description}{" "}
          {product.learnMoreUrl && (
            <a className={styles.learnMore} href={product.learnMoreUrl}>
              Learn More
            </a>
          )}
        </p>

        {hasVariants(product) && (
          <VariantSelector
            productId={product.id}
            productName={product.name}
            variants={product.variants!}
            activeVariantId={activeVariantId!}
          />
        )}

        <div className={styles.footer}>
          <QuantityStepper
            value={quantity}
            min={product.minQty ?? 0}
            onDecrement={() => increment(product.id, activeVariantId, -1)}
            onIncrement={() => increment(product.id, activeVariantId, +1)}
            aria-label={`${product.name}${variant ? ` ${variant.label}` : ""} quantity`}
          />
          <Price
            active={unitActive}
            compareAt={product.compareAt}
            free={product.free}
            recurring={product.recurring}
            align="end"
          />
        </div>
      </div>
    </article>
  );
}
