import { useState } from "react";
import { useBundle } from "../../state/BundleContext";
import { CATEGORY_LABEL, REVIEW_CATEGORY_ORDER } from "../../data/catalog";
import { formatMoney } from "../../lib/format";
import { Icon } from "../../components/icons";
import { ReviewLineItem } from "./ReviewLineItem";
import styles from "./ReviewPanel.module.css";

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
    <aside className={styles.review} aria-label="Your security system summary">
      <p className={styles.eyebrow}>Review</p>
      <h2 className={styles.heading}>Your security system</h2>
      <p className={styles.subtitle}>
        Review your personalized protection system designed to keep what matters
        most safe.
      </p>

      <div className={styles.items}>
        {hasAnything ? (
          REVIEW_CATEGORY_ORDER.map((categoryId) => {
            const lines = linesByCategory(categoryId);
            if (lines.length === 0) return null;
            return (
              <section className={styles.group} key={categoryId}>
                <h3 className={styles.groupTitle}>{CATEGORY_LABEL[categoryId]}</h3>
                {lines.map((line) => (
                  <ReviewLineItem key={line.key} line={line} />
                ))}
              </section>
            );
          })
        ) : (
          <p className={styles.empty}>
            Nothing selected yet — pick a camera to start building your system.
          </p>
        )}

        {shippingLine && (
          <section className={`${styles.group} ${styles.shippingGroup}`}>
            <ReviewLineItem line={shippingLine} />
          </section>
        )}
      </div>

      <div className={styles.summaryCard}>
        <div className={styles.summaryTop}>
          <span className={styles.seal} aria-hidden>
            <Icon name="seal" size={40} />
          </span>
          <div className={styles.totals}>
            <span className={styles.financing}>
              as low as {formatMoney(summary.financingMonthly)}/mo
            </span>
            <div className={styles.totalRow}>
              {summary.compareTotal > summary.activeTotal && (
                <span className={styles.totalCompare}>
                  {formatMoney(summary.compareTotal)}
                </span>
              )}
              <span className={styles.totalActive}>
                {formatMoney(summary.activeTotal)}
              </span>
            </div>
          </div>
        </div>

        {summary.savings > 0 && (
          <p className={styles.savings}>
            Congrats! You’re saving {formatMoney(summary.savings)} on your security
            bundle!
          </p>
        )}

        {checkoutMsg && (
          <p className={styles.checkoutMsg} role="status">
            This is a prototype — checkout isn’t connected. Your system is saved.
          </p>
        )}

        <button
          type="button"
          className={styles.checkout}
          onClick={() => setCheckoutMsg(true)}
        >
          Checkout
        </button>
      </div>

      <div className={styles.saveRow}>
        <button type="button" className={styles.saveLink} onClick={saveSystem}>
          <Icon name="check" size={14} />
          Save my system for later
        </button>
        {savedAt && (
          <span className={styles.savedToast} role="status">
            Saved!
          </span>
        )}
      </div>
    </aside>
  );
}
