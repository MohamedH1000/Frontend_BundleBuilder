import type { SelectionState } from "../types";

/**
 * Client-side persistence for the shopper's configured system.
 *
 * The shape is versioned so a future schema change can invalidate stale data
 * instead of crashing on hydrate. Everything is guarded for non-browser
 * environments (SSR / restricted storage).
 */

const STORAGE_KEY = "bundleBuilder.selection.v1";
const SCHEMA_VERSION = 1;

interface Envelope {
  v: number;
  state: SelectionState;
}

function storageAvailable(): boolean {
  try {
    return typeof window !== "undefined" && !!window.localStorage;
  } catch {
    return false;
  }
}

/**
 * Load a saved system. Returns null when there is nothing valid to restore,
 * so callers fall back to the design seed. Never throws.
 */
export function loadState(): SelectionState | null {
  if (!storageAvailable()) return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Envelope;
    if (parsed.v !== SCHEMA_VERSION) return null;
    if (!isValidState(parsed.state)) return null;
    return parsed.state;
  } catch {
    return null;
  }
}

/** Persist the system exactly as it is right now. */
export function saveState(state: SelectionState): boolean {
  if (!storageAvailable()) return false;
  try {
    const envelope: Envelope = { v: SCHEMA_VERSION, state };
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(envelope));
    return true;
  } catch {
    return false;
  }
}

/** Wipe any saved system (used by "start over"/reset). */
export function clearState(): void {
  if (!storageAvailable()) return;
  try {
    window.localStorage.removeItem(STORAGE_KEY);
  } catch {
    /* ignore */
  }
}

/** Structural guard so corrupted/foreign data can't crash the reducer. */
function isValidState(value: unknown): value is SelectionState {
  if (!value || typeof value !== "object") return false;
  const v = value as Record<string, unknown>;
  return (
    v.quantities !== undefined &&
    typeof v.quantities === "object" &&
    v.activeVariant !== undefined &&
    typeof v.activeVariant === "object" &&
    typeof v.openStep === "string"
  );
}
