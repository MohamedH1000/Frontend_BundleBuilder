import type { Variant } from "../types";
import { useBundle } from "../state/BundleContext";
import styles from "./VariantSelector.module.css";

interface VariantSelectorProps {
  productId: string;
  productName: string;
  variants: Variant[];
  activeVariantId: string;
}

/**
 * Row of colour chips. Selecting a chip makes it the active variant — the
 * card's stepper then binds to *that* variant's quantity. Each variant keeps
 * its own count, so adding 2 White then switching to Black shows Black's count
 * (0) while White (×2) is untouched.
 *
 * A small per-chip badge shows that colour's current count when > 0, making the
 * independent-quantity behaviour legible at a glance.
 */
export function VariantSelector({
  productId,
  productName,
  variants,
  activeVariantId,
}: VariantSelectorProps) {
  const { state, selectVariant } = useBundle();

  return (
    <div className={styles.row} role="radiogroup" aria-label={`${productName} colour`}>
      {variants.map((variant) => {
        const isActive = variant.id === activeVariantId;
        // Variant products key quantities as `${productId}::${variantId}`.
        const qty = state.quantities[`${productId}::${variant.id}`] ?? 0;
        return (
          <button
            key={variant.id}
            type="button"
            role="radio"
            aria-checked={isActive}
            aria-label={`${variant.label}${qty > 0 ? `, ${qty} selected` : ""}`}
            className={`${styles.chip} ${isActive ? styles.active : ""}`}
            onClick={() => selectVariant(productId, variant.id)}
          >
            <span
              className={`${styles.swatch} ${variant.swatch.toLowerCase() === "#ffffff" ? styles.whiteSwatch : ""}`}
              style={{ backgroundColor: variant.swatch }}
            />
            <span className={styles.label}>{variant.label}</span>
            {qty > 0 && <span className={styles.badge}>{qty}</span>}
          </button>
        );
      })}
    </div>
  );
}
