import { Icon } from "./icons";
import styles from "./QuantityStepper.module.css";

interface QuantityStepperProps {
  value: number;
  onDecrement: () => void;
  onIncrement: () => void;
  /** Lowest allowed value (e.g. 1 for required items). */
  min?: number;
  /** Highest allowed value. */
  max?: number;
  size?: "card" | "line";
  /** Accessible label for the control, e.g. "Wyze Cam v4 quantity". */
  "aria-label": string;
}

/**
 * [-]  N  [+]  control shared by product cards and review lines.
 *
 * Because both instances read and write the same selection key through the
 * bundle context, the two stay in sync automatically — no manual wiring.
 */
export function QuantityStepper({
  value,
  onDecrement,
  onIncrement,
  min = 0,
  max = 99,
  size = "card",
  "aria-label": ariaLabel,
}: QuantityStepperProps) {
  const atMin = value <= min;
  const atMax = value >= max;

  return (
    <div className={`${styles.stepper} ${styles[size]}`} role="group" aria-label={ariaLabel}>
      <button
        type="button"
        className={styles.btn}
        onClick={onDecrement}
        disabled={atMin}
        aria-label={`Decrease ${ariaLabel}`}
      >
        <Icon name="minus" size={size === "line" ? 14 : 16} />
      </button>
      <span className={styles.value} aria-live="polite">
        {value}
      </span>
      <button
        type="button"
        className={styles.btn}
        onClick={onIncrement}
        disabled={atMax}
        aria-label={`Increase ${ariaLabel}`}
      >
        <Icon name="plus" size={size === "line" ? 14 : 16} />
      </button>
    </div>
  );
}
