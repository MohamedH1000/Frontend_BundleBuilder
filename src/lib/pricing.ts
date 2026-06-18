import type {
  MoneySummary,
  Product,
  ReviewLine,
  SelectionState,
  StepId,
  Variant,
} from "../types";
import { hasVariants, products, selectionKey, steps } from "../data/catalog";
import { round2 } from "./format";

/* ----------------------------------------------------------------------------
 * Pure pricing engine.
 *
 * Every function here is pure (input -> output, no side effects), which keeps
 * the money math trivially testable and lets the review panel recompute from a
 * single source of truth on every state change.
 * -------------------------------------------------------------------------- */

/** Quantity stored for a (product, variant) pair, 0 if unset. */
export function getQuantity(
  state: SelectionState,
  product: Product,
  variantId?: string,
): number {
  return state.quantities[selectionKey(product, variantId)] ?? 0;
}

/** The active unit price a customer pays for one unit of a product. */
export function unitActive(product: Product): number {
  return product.free ? 0 : product.price;
}

/** The pre-discount unit price (falls back to the active price when none). */
export function unitCompare(product: Product): number {
  return product.compareAt ?? product.price;
}

/** Money for `quantity` units of a product. */
export function lineMoney(
  product: Product,
  quantity: number,
): { active: number; compare: number } {
  return {
    active: round2(quantity * unitActive(product)),
    compare: round2(quantity * unitCompare(product)),
  };
}

/**
 * Build the flat list of review lines — one per selection key that has a
 * quantity above zero. Variant products therefore produce one line *per colour
 * that was added* (the core requirement of the variant selector).
 *
 * Shipping is included as its own line; the summary excludes it from totals.
 */
export function buildReviewLines(state: SelectionState): ReviewLine[] {
  const lines: ReviewLine[] = [];

  for (const product of products) {
    if (hasVariants(product)) {
      for (const variant of product.variants!) {
        const key = selectionKey(product, variant.id);
        const quantity = state.quantities[key] ?? 0;
        if (quantity > 0) pushLine(lines, product, variant, key, quantity);
      }
    } else {
      const key = selectionKey(product);
      const quantity = state.quantities[key] ?? 0;
      if (quantity > 0) pushLine(lines, product, undefined, key, quantity);
    }
  }

  return lines;
}

function pushLine(
  out: ReviewLine[],
  product: Product,
  variant: Variant | undefined,
  key: string,
  quantity: number,
): void {
  const { active, compare } = lineMoney(product, quantity);
  out.push({ product, variant, quantity, key, lineActive: active, lineCompare: compare });
}

/**
 * Number of *distinct products* chosen in a step (not variants, not shipping).
 * Drives the "N selected" counter on each accordion header.
 */
export function selectedCountForStep(state: SelectionState, step: StepId): number {
  let count = 0;
  for (const product of products) {
    if (product.step !== step || product.shipping) continue;
    const chosen = hasVariants(product)
      ? product.variants!.some((v) => getQuantity(state, product, v.id) > 0)
      : getQuantity(state, product) > 0;
    if (chosen) count += 1;
  }
  return count;
}

/** Equal-monthly financing estimate on the active total (12 months, 0% APR). */
const FINANCE_MONTHS = 12;

/** Aggregate the whole system into a money summary for the review panel. */
export function summarize(state: SelectionState): MoneySummary {
  const lines = buildReviewLines(state);

  let compareTotal = 0;
  let activeTotal = 0;

  for (const line of lines) {
    if (line.product.shipping) continue; // shipping is a free perk, not in totals
    compareTotal += line.lineCompare;
    activeTotal += line.lineActive;
  }

  compareTotal = round2(compareTotal);
  activeTotal = round2(activeTotal);

  const selectedCountByStep = {} as Record<StepId, number>;
  for (const step of steps) {
    selectedCountByStep[step.id] = selectedCountForStep(state, step.id);
  }

  return {
    compareTotal,
    activeTotal,
    savings: round2(compareTotal - activeTotal),
    financingMonthly: round2(activeTotal / FINANCE_MONTHS),
    selectedCountByStep,
  };
}

/** Convenience: total distinct selected products across the whole bundle. */
export function totalSelected(summary: MoneySummary): number {
  return Object.values(summary.selectedCountByStep).reduce((a, b) => a + b, 0);
}
