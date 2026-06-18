import type { ReviewLine } from "../../types";
import { useBundle } from "../../state/BundleContext";
import { Icon, type IconName } from "../../components/icons";
import { Price } from "../../components/Price";
import { QuantityStepper } from "../../components/QuantityStepper";
import styles from "./ReviewLineItem.module.css";

interface ReviewLineItemProps {
  line: ReviewLine;
}

/**
 * One row in the review panel: thumbnail, name (+ variant + required tag),
 * quantity stepper, and the line total price. Shares the same selection keys
 * as the product cards, so the two steppers stay in sync automatically.
 *
 * Shipping rows omit the stepper (static, free perk).
 */
export function ReviewLineItem({ line }: ReviewLineItemProps) {
  const { increment } = useBundle();
  const { product, variant, quantity, lineActive, lineCompare } = line;
  const variantId = variant?.id;

  return (
    <div className={styles.line}>
      <span className={styles.thumb} aria-hidden>
        <Icon name={product.icon as IconName} size={26} />
      </span>

      <div className={styles.info}>
        <span className={styles.name}>
          {product.name}
          {product.required && <span className={styles.required}> (Required)</span>}
        </span>
        {variant && (
          <span className={styles.variant}>
            <span
              className={`${styles.variantDot} ${variant.swatch.toLowerCase() === "#ffffff" ? styles.whiteDot : ""}`}
              style={{ backgroundColor: variant.swatch }}
            />
            {variant.label}
          </span>
        )}
      </div>

      {!product.shipping && (
        <QuantityStepper
          size="line"
          value={quantity}
          min={product.minQty ?? 0}
          onDecrement={() => increment(product.id, variantId, -1)}
          onIncrement={() => increment(product.id, variantId, +1)}
          aria-label={`${product.name}${variant ? ` ${variant.label}` : ""} quantity`}
        />
      )}

      <Price
        size="sm"
        active={lineActive}
        compareAt={lineCompare}
        free={product.free}
        recurring={product.recurring}
        align="end"
      />
    </div>
  );
}
