import {
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useRef,
  useState,
  type ReactNode,
} from "react";
import type { MoneySummary, ReviewLine, StepId } from "../types";
import { createSeedState } from "../data/seed";
import { buildReviewLines, summarize } from "../lib/pricing";
import { loadState, saveState } from "./persistence";
import { reducer } from "./reducer";
import { BundleContext, type BundleContextValue } from "./BundleContext";

/**
 * Wires the reducer, persistence and derived data together and exposes them via
 * `BundleContext`. This file deliberately exports only the component so React
 * Fast Refresh stays effective; the context + `useBundle` hook live in
 * `BundleContext.ts`.
 */
export function BundleProvider({ children }: { children: ReactNode }) {
  // Lazy init: restore a saved system if present, otherwise the design seed.
  // Doing this in the initializer avoids a flash of the seed on reload.
  const [state, dispatch] = useReducer(reducer, undefined, () => {
    const restored = loadState();
    return restored ?? createSeedState();
  });

  const [isRestored] = useState(() => loadState() !== null);
  const [savedAt, setSavedAt] = useState<number | null>(null);
  const feedbackTimer = useRef<number | undefined>(undefined);

  // Auto-persist every change so the system is always recoverable.
  useEffect(() => {
    saveState(state);
  }, [state]);

  const summary = useMemo<MoneySummary>(() => summarize(state), [state]);
  const reviewLines = useMemo<ReviewLine[]>(() => buildReviewLines(state), [state]);

  const setQuantity = useCallback(
    (productId: string, variantId: string | undefined, quantity: number) =>
      dispatch({ type: "setQuantity", productId, variantId, quantity }),
    [],
  );
  const increment = useCallback(
    (productId: string, variantId: string | undefined, delta: number) =>
      dispatch({ type: "increment", productId, variantId, delta }),
    [],
  );
  const selectVariant = useCallback(
    (productId: string, variantId: string) =>
      dispatch({ type: "selectVariant", productId, variantId }),
    [],
  );
  const setOpenStep = useCallback(
    (step: StepId) => dispatch({ type: "setOpenStep", step }),
    [],
  );
  const toggleStep = useCallback(
    (step: StepId) => dispatch({ type: "toggleStep", step }),
    [],
  );
  const nextStep = useCallback(() => dispatch({ type: "nextStep" }), []);
  const reset = useCallback(
    () => dispatch({ type: "reset", state: createSeedState() }),
    [],
  );

  const saveSystem = useCallback(() => {
    const ok = saveState(state);
    if (ok) {
      setSavedAt(Date.now());
      window.clearTimeout(feedbackTimer.current);
      feedbackTimer.current = window.setTimeout(() => setSavedAt(null), 2600);
    }
  }, [state]);

  useEffect(() => () => window.clearTimeout(feedbackTimer.current), []);

  const value = useMemo<BundleContextValue>(
    () => ({
      state,
      summary,
      reviewLines,
      isRestored,
      setQuantity,
      increment,
      selectVariant,
      setOpenStep,
      toggleStep,
      nextStep,
      reset,
      saveSystem,
      savedAt,
    }),
    [
      state,
      summary,
      reviewLines,
      isRestored,
      setQuantity,
      increment,
      selectVariant,
      setOpenStep,
      toggleStep,
      nextStep,
      reset,
      saveSystem,
      savedAt,
    ],
  );

  return <BundleContext.Provider value={value}>{children}</BundleContext.Provider>;
}
