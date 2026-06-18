import type { SelectionState } from "../types";
import { getProduct, selectionKey } from "./catalog";

/**
 * The initial selection — chosen so the app loads looking like the source
 * design: two cameras, the motion sensor + required hub, a 256GB card, the
 * Cam Unlimited plan, and free fast shipping.
 *
 * Quantities are keyed by `selectionKey` (see catalog.ts): variant products
 * store per-variant counts, so e.g. the 2× Wyze Cam Pan v3 are tracked as
 * White specifically and can coexist with other colours the shopper adds later.
 */
export function createSeedState(): SelectionState {
  const q = (productId: string, variantId: string | undefined, qty: number) => {
    const product = getProduct(productId)!;
    return [selectionKey(product, variantId), qty] as const;
  };

  const quantities = Object.fromEntries([
    q("cam-v4", "white", 1),
    q("cam-pan-v3", "white", 2),
    q("sensor-motion", undefined, 2),
    q("sensor-hub", undefined, 1),
    q("sdcard-256", undefined, 2),
    q("plan-cam-unlimited", undefined, 1),
    q("fast-shipping", undefined, 1),
  ]);

  const activeVariant: Record<string, string> = {
    "cam-v4": "white",
    "cam-pan-v3": "white",
    "cam-floodlight-v2": "white",
    "battery-cam-pro": "white",
  };

  return {
    quantities,
    activeVariant,
    openStep: "cameras",
  };
}
