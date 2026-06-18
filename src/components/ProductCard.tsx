import type { Product } from "../types";
import { useBundle } from "../state/BundleContext";
import { getQuantity } from "../lib/pricing";
import { getVariant, hasVariants } from "../data/catalog";
import { ProductGraphic } from "./ProductGraphic";
import { Price } from "./Price";
import { QuantityStepper } from "./QuantityStepper";
import { VariantSelector } from "./VariantSelector";
import { cn } from "../lib/cn";

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
 *
 * Geometry (padding, column widths, gaps) mirrors the source design's frames;
 * the image slot is a placeholder until real assets are dropped in.
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
      aria-label={product.name}
      data-selected={selected || undefined}
      className={cn(
        "grid grid-cols-[100px_minmax(0,1fr)] items-stretch gap-[18px] rounded-lg border bg-white p-[11px] transition-colors",
        selected
          ? "border-brand shadow-[0_0_0_1px_var(--color-brand)]"
          : "border-line hover:border-line-strong",
      )}
    >
      {/* Image slot — product photo (from catalog) or a placeholder glyph.
          The "Save X%" badge is part of the exported image, so it isn't overlaid here. */}
      <div className="relative flex min-h-[104px] self-stretch items-center justify-center overflow-hidden rounded-md bg-white text-ink-faint">
        {product.required && (
          <span className="absolute bottom-1.5 left-1.5 rounded-full bg-[rgba(11,13,16,0.78)] px-[7px] py-[2px] text-[10px] font-bold uppercase tracking-[0.04em] text-white">
            Required
          </span>
        )}
        <ProductGraphic product={product} iconSize={64} />
      </div>

      <div className="flex min-w-0 flex-col gap-2.5">
        <div className="flex flex-wrap items-center gap-2">
          <h3 className="text-[15px] font-semibold leading-tight text-ink">{product.name}</h3>
          {product.recurring && (
            <span className="rounded-full bg-brand-soft px-[7px] py-px text-[10px] font-bold uppercase tracking-[0.04em] text-brand">
              Subscription
            </span>
          )}
        </div>

        <p className="text-[13px] leading-4 text-ink-soft">
          {product.description}{" "}
          {product.learnMoreUrl && (
            <a className="whitespace-nowrap font-semibold text-brand" href={product.learnMoreUrl}>
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

        <div className="mt-auto flex items-center justify-between gap-3 pt-1">
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
