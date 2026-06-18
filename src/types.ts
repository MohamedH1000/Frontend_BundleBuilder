/**
 * Domain model for the Bundle Builder.
 *
 * The model is intentionally data-driven: the entire catalog is described by
 * plain data (see `data/catalog.json`) and every screen is rendered from it.
 * Adding a product, variant, or step never requires touching component code.
 */

/** The four accordion steps, in walk-through order. */
export type StepId = "cameras" | "plan" | "sensors" | "accessories";

/** Review-panel grouping. A step maps 1:1 to a review category. */
export type CategoryId = StepId;

/** A selectable colour/variant of a product (e.g. "White", "Black"). */
export interface Variant {
  /** Stable id, unique within the product. */
  id: string;
  /** Human label shown under the swatch. */
  label: string;
  /**
   * CSS colour for the swatch dot. Solid-colour chips are used to represent
   * the image-based swatches in the source design (see README).
   */
  swatch: string;
}

/** A purchasable product. */
export interface Product {
  id: string;
  name: string;
  /** One-line marketing copy. May contain a trailing "Learn More" link. */
  description: string;
  /** Longer description used for the "Learn More" affordance, if desired. */
  longDescription?: string;
  category: CategoryId;
  step: StepId;

  /** Icon key rendered by <ProductIcon /> (SVG placeholder for the photo). */
  icon: string;

  /** Optional discount badge, e.g. "Save 22%". */
  badge?: string;

  /** Destination for the "Learn More" link. */
  learnMoreUrl?: string;

  /** Variants. Omit entirely for products with a single SKU (e.g. doorbell). */
  variants?: Variant[];

  /** Active unit price (what the customer pays). */
  price: number;
  /** Pre-discount unit price rendered struck-through. Omit when no discount. */
  compareAt?: number;

  /** Recurring price cadence, e.g. the monitoring plan. */
  recurring?: "monthly";

  /** Render the active price as "FREE" (bundle-included hub, shipping). */
  free?: boolean;

  /** Required items cannot be reduced below `minQty` and can't be removed. */
  required?: boolean;
  minQty?: number;

  /** Shipping rows are shown in the review but excluded from the totals. */
  shipping?: boolean;
}

/** Top-level accordion step descriptor. */
export interface Step {
  id: StepId;
  /** "STEP 1 OF 4" index (1-based). */
  index: number;
  total: number;
  title: string;
  /** Icon key for the step header. */
  icon: string;
  category: CategoryId;
}

/**
 * Persisted selection state.
 *
 * Quantities are keyed by a "selection key": for variant-less products this is
 * just the product id; for variant products it is `${productId}::${variantId}`.
 * This makes "every variant with a count > 0 is its own review line" fall out
 * naturally — each occupied key is one line item.
 */
export interface SelectionState {
  /** selectionKey -> quantity. */
  quantities: Record<string, number>;
  /** productId -> active variant id (only for variant products). */
  activeVariant: Record<string, string>;
  /** Currently expanded step, or null when all are collapsed. */
  openStep: StepId | null;
}

/** A concrete line in the review panel (product + variant + quantity). */
export interface ReviewLine {
  product: Product;
  variant?: Variant;
  quantity: number;
  /** selectionKey this line corresponds to. */
  key: string;
  /** Computed money values for this line. */
  lineActive: number;
  lineCompare: number;
}

/** Aggregated money summary for the whole system. */
export interface MoneySummary {
  /** Pre-discount total (struck-through). Excludes shipping. */
  compareTotal: number;
  /** Active total the customer pays. Excludes shipping. */
  activeTotal: number;
  /** compareTotal - activeTotal. */
  savings: number;
  /** Estimated equal monthly payment on the active total. */
  financingMonthly: number;
  /** Distinct products chosen, per category (for "N selected" counters). */
  selectedCountByStep: Record<StepId, number>;
}
