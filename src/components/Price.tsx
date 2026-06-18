import { formatMoney, formatRecurring } from "../lib/format";
import styles from "./Price.module.css";

interface PriceProps {
  active: number;
  compareAt?: number;
  free?: boolean;
  recurring?: "monthly";
  size?: "lg" | "sm";
  align?: "start" | "end";
}

/**
 * Price display: an optional struck-through compare-at price above the active
 * price. `free` renders "FREE" in the active slot; `recurring` appends "/mo".
 * Aligns right inside review rows.
 */
export function Price({
  active,
  compareAt,
  free,
  recurring,
  size = "lg",
  align = "start",
}: PriceProps) {
  const showCompare = compareAt != null && (free || compareAt > active);
  const activeText = free ? "FREE" : recurring ? formatRecurring(active) : formatMoney(active);
  const compareText = recurring ? formatRecurring(compareAt!) : formatMoney(compareAt!);

  return (
    <div className={`${styles.price} ${styles[size]} ${styles[align]}`}>
      {showCompare && (
        <span className={styles.compare} data-testid="price-compare">
          {compareText}
        </span>
      )}
      <span className={`${styles.active} ${free ? styles.freeActive : ""}`}>{activeText}</span>
    </div>
  );
}
