import { createContext, useContext } from "react";
import type { MoneySummary, ReviewLine, SelectionState, StepId } from "../types";

/**
 * The single context surface for the whole app. Components read `state`,
 * `summary` and `reviewLines` (all derived, memoized) and dispatch intent via
 * the action callbacks — they never touch the reducer or storage directly.
 *
 * Kept in its own module (separate from the provider component) so the file that
 * exports a component stays component-only — which keeps React Fast Refresh
 * happy.
 */
export interface BundleContextValue {
  state: SelectionState;
  summary: MoneySummary;
  reviewLines: ReviewLine[];
  /** True when the system was restored from a previous visit. */
  isRestored: boolean;

  setQuantity: (productId: string, variantId: string | undefined, quantity: number) => void;
  increment: (productId: string, variantId: string | undefined, delta: number) => void;
  selectVariant: (productId: string, variantId: string) => void;
  setOpenStep: (step: StepId) => void;
  toggleStep: (step: StepId) => void;
  nextStep: () => void;
  reset: () => void;
  /** Explicitly save + surface confirmation feedback (also auto-saved on change). */
  saveSystem: () => void;
  /** Epoch ms of the last explicit save, or null (drives the "Saved!" toast). */
  savedAt: number | null;
}

export const BundleContext = createContext<BundleContextValue | null>(null);

/** Access the bundle context. Throws if used outside the provider. */
export function useBundle(): BundleContextValue {
  const ctx = useContext(BundleContext);
  if (!ctx) throw new Error("useBundle must be used within a <BundleProvider>");
  return ctx;
}
