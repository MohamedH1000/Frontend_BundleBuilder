import type { CategoryId, Product, Step, StepId, Variant } from "../types";
import catalogJson from "./catalog.json";

/** Raw JSON shape mirrors the domain types; cast once at the boundary. */
interface Catalog {
  steps: Step[];
  products: Product[];
}

export const catalog = catalogJson as unknown as Catalog;

export const steps: Step[] = catalog.steps;
export const products: Product[] = catalog.products;

export const STEP_COUNT = steps.length;

/** Look up a product by id. */
const productById = new Map(products.map((p) => [p.id, p]));
export function getProduct(id: string): Product | undefined {
  return productById.get(id);
}

/** Products that belong to a given step, in catalog order. */
export function productsByStep(stepId: StepId): Product[] {
  return products.filter((p) => p.step === stepId);
}

/** The shipping line is a static, non-interactive review row. */
export const SHIPPING_PRODUCT = products.find((p) => p.shipping)!;

/** Whether a product offers colour/variant choices. */
export function hasVariants(product: Product): boolean {
  return Array.isArray(product.variants) && product.variants.length > 0;
}

/**
 * The "selection key" — the unique handle under which a quantity is stored.
 * Variant-less products use their id; variant products pair id + variant id so
 * each colour is tracked independently (see README → The variant selector).
 */
export function selectionKey(product: Product, variantId?: string): string {
  if (!hasVariants(product)) return product.id;
  return `${product.id}::${variantId ?? product.variants![0].id}`;
}

/** Resolve the variant object that is currently active for a product. */
export function getVariant(product: Product, variantId?: string): Variant | undefined {
  if (!hasVariants(product)) return undefined;
  return product.variants!.find((v) => v.id === variantId) ?? product.variants![0];
}

/** All category ids in review-display order (matches the design). */
export const REVIEW_CATEGORY_ORDER: CategoryId[] = [
  "cameras",
  "sensors",
  "accessories",
  "plan",
];

/** Human label for each review category heading. */
export const CATEGORY_LABEL: Record<CategoryId, string> = {
  cameras: "Cameras",
  sensors: "Sensors",
  accessories: "Accessories",
  plan: "Plan",
};
