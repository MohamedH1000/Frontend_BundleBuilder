import { describe, expect, it } from "vitest";
import type { SelectionState } from "../types";
import { createSeedState } from "../data/seed";
import {
  buildReviewLines,
  getQuantity,
  lineMoney,
  selectedCountForStep,
  summarize,
} from "./pricing";
import { getProduct } from "../data/catalog";
import { round2 } from "./format";

describe("pricing engine", () => {
  const seed = createSeedState();

  describe("seed summary (matches the source design intent)", () => {
    const summary = summarize(seed);

    it("counts selected products per step", () => {
      expect(summary.selectedCountByStep.cameras).toBe(2);
      expect(summary.selectedCountByStep.plan).toBe(1);
      expect(summary.selectedCountByStep.sensors).toBe(2);
      expect(summary.selectedCountByStep.accessories).toBe(1);
    });

    it("computes savings = compare total - active total (rounded)", () => {
      expect(summary.savings).toBe(round2(summary.compareTotal - summary.activeTotal));
      // $5/unit discount on each discounted line; robustly $50.92.
      expect(summary.savings).toBe(50.92);
    });

    it("excludes free shipping from both totals", () => {
      // Shipping is free, and its $5.99 compare-at is not rolled into totals.
      expect(summary.activeTotal).toBe(209.87);
      expect(summary.compareTotal).toBe(260.79);
    });

    it("estimates equal monthly financing over 12 months", () => {
      expect(summary.financingMonthly).toBe(Math.round((209.87 / 12) * 100) / 100);
    });
  });

  describe("variant independence", () => {
    it("tracks each colour under its own key", () => {
      const cam = getProduct("cam-v4")!;
      expect(getQuantity(seed, cam, "white")).toBe(1);
      expect(getQuantity(seed, cam, "black")).toBe(0);
    });

    it("lists every colour with a count > 0 as its own review line", () => {
      const state: SelectionState = {
        ...seed,
        quantities: {
          ...seed.quantities,
          "cam-v4::white": 1,
          "cam-v4::black": 3,
        },
      };
      const camLines = buildReviewLines(state).filter((l) => l.product.id === "cam-v4");
      expect(camLines).toHaveLength(2);
      expect(camLines.map((l) => l.variant?.id).sort()).toEqual(["black", "white"]);
      expect(camLines.find((l) => l.variant?.id === "black")!.quantity).toBe(3);
    });
  });

  describe("line money", () => {
    it("values a free bundle item at $0 active with its compare-at struck", () => {
      const hub = getProduct("sensor-hub")!;
      const { active, compare } = lineMoney(hub, 1);
      expect(active).toBe(0);
      expect(compare).toBe(29.92);
    });

    it("multiplies unit price by quantity", () => {
      const motion = getProduct("sensor-motion")!;
      expect(lineMoney(motion, 2)).toEqual({ active: 59.98, compare: 59.98 });
    });
  });

  describe("step counters ignore shipping", () => {
    it("does not count the free shipping row toward accessories", () => {
      // Seed has shipping + 1 accessory; counter must read 1, not 2.
      expect(selectedCountForStep(seed, "accessories")).toBe(1);
    });
  });
});
