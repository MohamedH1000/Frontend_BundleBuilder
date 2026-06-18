import { steps } from "../../data/catalog";
import { StepSection } from "./StepSection";
import styles from "./BuilderColumn.module.css";

/**
 * Left column: the vertical 4-step accordion. Each step is self-contained and
 * reads its open/selected state from the bundle context, so this component is a
 * thin composition shell.
 */
export function BuilderColumn() {
  return (
    <section className={styles.builder} aria-label="Build your security bundle">
      {steps.map((step) => (
        <StepSection key={step.id} step={step} />
      ))}
    </section>
  );
}
