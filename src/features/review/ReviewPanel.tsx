import { useState } from "react";
import { useBundle } from "../../state/BundleContext";
import { CATEGORY_LABEL, REVIEW_CATEGORY_ORDER } from "../../data/catalog";
import { formatMoney } from "../../lib/format";
import { Icon } from "../../components/icons";
import { ReviewLineItem } from "./ReviewLineItem";

/**
 * Right column: the live "Your security system" summary.
 *
 * Every figure here is derived from the same selection state as the builder, so
 * it recomputes instantly as the shopper changes quantities or variants.
 * Category groups (Cameras / Sensors / Accessories / Plan) list each selected
 * variant as its own line; shipping is shown as a static free row; the totals,
 * savings and financing are produced by the pricing engine.
 */
export function ReviewPanel() {
  const { summary, reviewLines, saveSystem, savedAt } = useBundle();
  const [checkoutMsg, setCheckoutMsg] = useState(false);

  const linesByCategory = (categoryId: string) =>
    reviewLines.filter((l) => l.product.category === categoryId && !l.product.shipping);

  const shippingLine = reviewLines.find((l) => l.product.shipping);
  const hasAnything = reviewLines.some((l) => !l.product.shipping);

  return (
    <aside aria-label="Your security system summary" className="rounded-xl bg-review px-[22px] pb-[22px] pt-[18px] shadow-card">
      <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.1em] text-brand">Review</p>
      <h2 className="text-[22px] font-extrabold leading-tight text-ink">Your security system</h2>
      <p className="mt-1.5 text-sm leading-[1.45] text-ink-soft">
        Review your personalized protection system designed to keep what matters most safe.
      </p>

      <div className="mt-[18px]">
        {hasAnything ? (
          REVIEW_CATEGORY_ORDER.map((categoryId) => {
            const lines = linesByCategory(categoryId);
            if (lines.length === 0) return null;
            return (
              <section key={categoryId} className="border-t border-line py-1.5 first:border-t-0">
                <h3 className="mb-0.5 mt-2 text-[13px] font-bold uppercase tracking-[0.04em] text-ink-soft">
                  {CATEGORY_LABEL[categoryId]}
                </h3>
                {lines.map((line) => (
                  <ReviewLineItem key={line.key} line={line} />
                ))}
              </section>
            );
          })
        ) : (
          <p className="py-6 text-center text-sm text-ink-soft">
            Nothing selected yet — pick a camera to start building your system.
          </p>
        )}

        {shippingLine && (
          <section className="mt-1.5 border-t border-line pt-2.5">
            <ReviewLineItem line={shippingLine} />
          </section>
        )}
      </div>

      <div className="mt-[18px] rounded-lg bg-white p-[18px] shadow-card">
        <div className="flex items-center gap-3.5">
          <span aria-hidden className="flex h-16 w-16 flex-none items-center justify-center rounded-full bg-success-soft text-success">
            <Icon name="seal" size={40} />
          </span>
          <div className="flex min-w-0 flex-1 flex-col items-end gap-0.5">
            <span className="text-xs font-semibold text-ink-soft">
              as low as {formatMoney(summary.financingMonthly)}/mo
            </span>
            <div className="flex items-baseline gap-2">
              {summary.compareTotal > summary.activeTotal && (
                <span className="text-sm text-compare line-through">
                  {formatMoney(summary.compareTotal)}
                </span>
              )}
              <span className="text-[28px] font-extrabold leading-none text-brand">
                {formatMoney(summary.activeTotal)}
              </span>
            </div>
          </div>
        </div>

        {summary.savings > 0 && (
          <p className="mt-3.5 rounded-sm  px-3 py-2 text-center text-[12px] font-semibold text-success">
            Congrats! You’re saving {formatMoney(summary.savings)} on your security bundle!
          </p>
        )}

        {checkoutMsg && (
          <p role="status" className="mt-3 text-center text-xs text-ink-soft">
            This is a prototype — checkout isn’t connected. Your system is saved.
          </p>
        )}

        <button
          type="button"
          onClick={() => setCheckoutMsg(true)}
          className="mt-3.5 w-full rounded-md bg-brand px-5 py-[15px] text-base font-bold text-white shadow-[0_8px_20px_rgba(78,47,210,0.35)] transition-colors hover:bg-brand-hover active:translate-y-px"
        >
          Checkout
        </button>
      </div>

      <div className="mt-3.5 flex items-center justify-center gap-2.5">
        <button
          type="button"
          onClick={saveSystem}
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand hover:underline"
        >
          <Icon name="check" size={14} />
          Save my system for later
        </button>
        {savedAt && (
          <span role="status" className="animate-pop rounded-full bg-success px-2.5 py-[3px] text-xs font-bold text-white">
            Saved!
          </span>
        )}
      </div>
    </aside>
  );
}
