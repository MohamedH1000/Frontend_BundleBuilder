import type { Step } from "../../types";
import { useBundle } from "../../state/BundleContext";
import { productsByStep, steps } from "../../data/catalog";
import { ProductCard } from "../../components/ProductCard";
import { Icon, StepIcon } from "../../components/icons";
import { cn } from "../../lib/cn";

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
    <section className={cn("border-b border-line bg-white", "[&:last-child]:border-b-0", isOpen && "!bg-step-open")}>
      <button
        type="button"
        aria-expanded={isOpen}
        aria-controls={`step-panel-${step.id}`}
        onClick={() => toggleStep(step.id)}
        className="block w-full px-4 py-[18px] text-left transition-colors hover:bg-step-open max-[560px]:px-3.5 max-[560px]:py-3.5"
      >
        <span className="mb-1.5 block text-[11px] font-bold uppercase tracking-[0.08em] text-ink-soft">
          Step {step.index} of {step.total}
        </span>

        <span className="flex items-center gap-3">
          <span className="inline-flex flex-none items-center justify-center" aria-hidden>
            <StepIcon name={step.icon} size={26} />
          </span>
          <span className="min-w-0 flex-1 text-lg font-bold text-ink max-[560px]:text-base">
            {step.title}
          </span>

          <span className="inline-flex flex-none items-center gap-2.5">
            {isOpen && <span className="text-[13px] font-semibold text-ink-soft">{selectedCount} selected</span>}
            <span className="inline-flex text-ink-soft" aria-hidden>
              <Icon name={isOpen ? "chevron-up" : "chevron-down"} size={20} />
            </span>
          </span>
        </span>
      </button>

      {isOpen && (
        <div id={`step-panel-${step.id}`} role="region" className="animate-reveal bg-step-open px-4 pb-[22px] pt-[18px] max-[560px]:px-3.5 max-[560px]:pb-[18px] max-[560px]:pt-3.5">
          <div className="card-grid">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {nextStepMeta && (
            <button
              type="button"
              onClick={nextStep}
              className="mt-[18px] inline-flex items-center gap-1.5 rounded-[10px] border-[2px] border-brand px-[22px] py-3 text-[15px] font-semibold text-brand shadow-[0_6px_16px_rgba(78,47,210,0.35)] transition-colors active:translate-y-px"
            >
              Next: {nextStepMeta.title}
              <Icon name="chevron-down" size={18} className="-rotate-90" />
            </button>
          )}
        </div>
      )}
    </section>
  );
}
