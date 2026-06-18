import type { Variant } from "../types";
import { useBundle } from "../state/BundleContext";
import { cn } from "../lib/cn";

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
    <div className="flex flex-wrap gap-2" role="radiogroup" aria-label={`${productName} colour`}>
      {variants.map((variant) => {
        const isActive = variant.id === activeVariantId;
        const isWhite = variant.swatch.toLowerCase() === "#ffffff";
        // Variant products key quantities as `${productId}::${variantId}`.
        const qty = state.quantities[`${productId}::${variant.id}`] ?? 0;
        return (
          <button
            key={variant.id}
            type="button"
            role="radio"
            aria-checked={isActive}
            aria-label={`${variant.label}${qty > 0 ? `, ${qty} selected` : ""}`}
            onClick={() => selectVariant(productId, variant.id)}
            className={cn(
              "inline-flex items-center gap-2 rounded-full border-[1.5px] border-transparent bg-surface-alt py-[5px] pl-[5px] pr-3 transition-colors hover:bg-brand-softer active:scale-[0.97]",
              isActive && "border-brand bg-brand-soft",
            )}
          >
            <span
              className={cn(
                "h-6 w-6 flex-none rounded-full shadow-[inset_0_0_0_1px_rgba(16,24,40,0.08)]",
                isWhite && "shadow-[inset_0_0_0_1px_var(--color-line-strong)]",
              )}
              style={{ backgroundColor: variant.swatch }}
            />
            <span className="text-[11px] font-semibold leading-none text-ink-soft">{variant.label}</span>
            {qty > 0 && (
              <span className="inline-flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-brand px-[5px] text-[11px] font-bold leading-none text-white">
                {qty}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
