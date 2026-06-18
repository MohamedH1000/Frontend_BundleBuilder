import { steps } from "../../data/catalog";
import { StepSection } from "./StepSection";

/**
 * Left column: the vertical 4-step accordion. Each step is self-contained and
 * reads its open/selected state from the bundle context, so this component is a
 * thin composition shell. No enclosing card — the steps sit directly on the
 * page, separated only by their divider lines (as in the source design).
 */
export function BuilderColumn() {
  return (
    <section aria-label="Build your security bundle" className="bg-white">
      {steps.map((step) => (
        <StepSection key={step.id} step={step} />
      ))}
    </section>
  );
}
