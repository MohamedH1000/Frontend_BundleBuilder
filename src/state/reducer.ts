import type { SelectionState, StepId } from "../types";
import { getProduct, hasVariants, selectionKey, steps } from "../data/catalog";

/**
 * Reducer for the bundle selection.
 *
 * The reducer is the single authority over how state mutates. UI components
 * stay dumb by dispatching intent ("increment this variant") instead of
 * building the next state themselves — Dependency Inversion via the action
 * contract.
 */

export type Action =
  | { type: "hydrate"; state: SelectionState }
  | { type: "setQuantity"; productId: string; variantId?: string; quantity: number }
  | { type: "increment"; productId: string; variantId?: string; delta: number }
  | { type: "selectVariant"; productId: string; variantId: string }
  | { type: "setOpenStep"; step: StepId }
  | { type: "toggleStep"; step: StepId }
  | { type: "nextStep" }
  | { type: "reset"; state: SelectionState };

const STEP_ORDER: StepId[] = steps.map((s) => s.id);

function clone(state: SelectionState): SelectionState {
  return {
    quantities: { ...state.quantities },
    activeVariant: { ...state.activeVariant },
    openStep: state.openStep,
  };
}

/** Lower bound for a product's quantity (required items can't hit zero). */
function minQuantity(productId: string): number {
  const product = getProduct(productId);
  return product?.minQty ?? 0;
}

export function reducer(state: SelectionState, action: Action): SelectionState {
  switch (action.type) {
    case "hydrate":
      return action.state;

    case "reset":
      return action.state;

    case "selectVariant": {
      const product = getProduct(action.productId);
      if (!product || !hasVariants(product)) return state;
      const next = clone(state);
      next.activeVariant[product.id] = action.variantId;
      return next;
    }

    case "setQuantity": {
      const product = getProduct(action.productId);
      if (!product) return state;
      const key = selectionKey(product, action.variantId);
      const min = minQuantity(product.id);
      const clamped = Math.max(min, Math.min(action.quantity, 99));
      const next = clone(state);
      if (clamped <= 0) delete next.quantities[key];
      else next.quantities[key] = clamped;
      return next;
    }

    case "increment": {
      const product = getProduct(action.productId);
      if (!product) return state;
      const key = selectionKey(product, action.variantId);
      const current = state.quantities[key] ?? 0;
      const min = minQuantity(product.id);
      const clamped = Math.max(min, Math.min(current + action.delta, 99));
      const next = clone(state);
      if (clamped <= 0) delete next.quantities[key];
      else next.quantities[key] = clamped;
      return next;
    }

    case "setOpenStep": {
      const next = clone(state);
      next.openStep = action.step;
      return next;
    }

    case "toggleStep": {
      const next = clone(state);
      next.openStep = state.openStep === action.step ? null : action.step;
      return next;
    }

    case "nextStep": {
      const current = state.openStep ?? STEP_ORDER[0];
      const idx = STEP_ORDER.indexOf(current);
      const nextStep = STEP_ORDER[Math.min(idx + 1, STEP_ORDER.length - 1)];
      const next = clone(state);
      next.openStep = nextStep;
      return next;
    }

    default:
      return state;
  }
}

export type { SelectionState, StepId };
