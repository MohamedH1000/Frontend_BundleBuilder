import type { ReviewLine } from "../../types";
import { useBundle } from "../../state/BundleContext";
import { ProductGraphic } from "../../components/ProductGraphic";
import { Price } from "../../components/Price";
import { QuantityStepper } from "../../components/QuantityStepper";
import { cn } from "../../lib/cn";

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
  const isWhite = variant?.swatch.toLowerCase() === "#ffffff";

  return (
    <div className="flex items-center gap-3 py-2.5 max-[420px]:flex-wrap">
      <span
        aria-hidden
        className="flex h-11 w-11 flex-none items-center justify-center rounded-sm bg-white p-1 text-brand shadow-[inset_0_0_0_1px_var(--color-line)]"
      >
        <ProductGraphic product={product} iconSize={26} />
      </span>

      <div className="flex min-w-0 flex-1 flex-col gap-0.5 max-[420px]:flex-[1_1_60%]">
        <span className="text-sm font-semibold leading-tight text-ink">
          {product.name}
          {product.required && <span className="font-medium text-ink-soft"> (Required)</span>}
        </span>
        {variant && (
          <span className="inline-flex items-center gap-1.5 text-xs text-ink-soft">
            <span
              className={cn(
                "h-3 w-3 rounded-full shadow-[inset_0_0_0_1px_rgba(16,24,40,0.1)]",
                isWhite && "shadow-[inset_0_0_0_1px_var(--color-line-strong)]",
              )}
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
