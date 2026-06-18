import type { Step } from "../../types";
import { useBundle } from "../../state/BundleContext";
import { productsByStep } from "../../data/catalog";
import { steps } from "../../data/catalog";
import { ProductCard } from "../../components/ProductCard";
import { Icon, StepIcon } from "../../components/icons";
import styles from "./StepSection.module.css";

interface StepSectionProps {
  step: Step;
}

/**
 * One accordion step: an always-visible header (eyebrow "STEP X OF 4", icon,
 * title, and a right-side state indicator) and a collapsible body with the
 * product cards plus a "Next: …" advance button.
 *
 * - Open header shows "{N} selected" + an up-chevron; collapsed shows only a
 *   down-chevron (matching the source design).
 * - Only one step is open at a time; clicking an open step collapses it.
 */
export function StepSection({ step }: StepSectionProps) {
  const { state, summary, toggleStep, nextStep } = useBundle();
  const isOpen = state.openStep === step.id;
  const selectedCount = summary.selectedCountByStep[step.id];

  const stepIndex = steps.findIndex((s) => s.id === step.id);
  const nextStepMeta = steps[stepIndex + 1];
  const products = productsByStep(step.id);

  return (
    <section className={`${styles.step} ${isOpen ? styles.open : ""}`}>
      <button
        type="button"
        className={styles.header}
        aria-expanded={isOpen}
        aria-controls={`step-panel-${step.id}`}
        onClick={() => toggleStep(step.id)}
      >
        <span className={styles.eyebrow}>
          Step {step.index} of {step.total}
        </span>

        <span className={styles.headerRow}>
          <span className={styles.icon} aria-hidden>
            <StepIcon name={step.icon} size={26} />
          </span>
          <span className={styles.title}>{step.title}</span>

          <span className={styles.indicator}>
            {isOpen && (
              <span className={styles.count}>
                {selectedCount} selected
              </span>
            )}
            <span className={styles.chevron} aria-hidden>
              <Icon name={isOpen ? "chevron-up" : "chevron-down"} size={20} />
            </span>
          </span>
        </span>
      </button>

      {isOpen && (
        <div className={styles.panel} id={`step-panel-${step.id}`} role="region">
          <div className={styles.grid}>
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {nextStepMeta && (
            <button type="button" className={styles.nextButton} onClick={nextStep}>
              Next: {nextStepMeta.title}
              <Icon name="chevron-down" size={18} className={styles.nextIcon} />
            </button>
          )}
        </div>
      )}
    </section>
  );
}
