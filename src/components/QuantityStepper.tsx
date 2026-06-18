import { Icon } from "./icons";
import { cn } from "../lib/cn";

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
  const iconSize = size === "line" ? 14 : 16;

  const btnClass = cn(
    "inline-flex items-center justify-center rounded-full bg-brand-soft text-brand transition-colors hover:bg-brand-tint active:scale-95",
    "disabled:cursor-not-allowed disabled:bg-surface-alt disabled:text-ink-faint disabled:opacity-70",
    size === "line" ? "h-6 w-6" : "h-[30px] w-[30px]",
  );

  return (
    <div className="inline-flex items-center gap-1.5" role="group" aria-label={ariaLabel}>
      <button
        type="button"
        className={btnClass}
        onClick={onDecrement}
        disabled={atMin}
        aria-label={`Decrease ${ariaLabel}`}
      >
        <Icon name="minus" size={iconSize} />
      </button>
      <span
        aria-live="polite"
        className={cn(
          "text-center font-semibold tabular-nums text-ink",
          size === "line" ? "min-w-[1rem] text-sm" : "min-w-[1.25rem] text-[15px]",
        )}
      >
        {value}
      </span>
      <button
        type="button"
        className={btnClass}
        onClick={onIncrement}
        disabled={atMax}
        aria-label={`Increase ${ariaLabel}`}
      >
        <Icon name="plus" size={iconSize} />
      </button>
    </div>
  );
}
