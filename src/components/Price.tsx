import { formatMoney, formatRecurring } from "../lib/format";
import { cn } from "../lib/cn";

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
    <div
      className={cn(
        "flex flex-col gap-px leading-[1.1] whitespace-nowrap",
        align === "end" ? "items-end" : "items-start",
        size === "sm" && "gap-0",
      )}
    >
      {showCompare && (
        <span
          data-testid="price-compare"
          className={cn(
            "text-compare line-through decoration-1",
            size === "lg" ? "text-[13px]" : "text-xs",
          )}
        >
          {compareText}
        </span>
      )}
      <span
        className={cn(
          "font-bold",
          free ? "text-success tracking-[0.02em]" : "text-brand",
          size === "lg" ? "text-[15px]" : "text-sm",
        )}
      >
        {activeText}
      </span>
    </div>
  );
}
