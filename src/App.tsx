import { BundleProvider } from "./state/BundleProvider";
import { BuilderColumn } from "./features/builder/BuilderColumn";
import { ReviewPanel } from "./features/review/ReviewPanel";
import styles from "./App.module.css";

/**
 * App shell: a slim brand top bar and the two-column experience — the builder
 * accordion on the left, the live review panel on the right (sticky on
 * desktop, stacked below the builder on smaller screens).
 */
export default function App() {
  return (
    <BundleProvider>
      <div className={styles.page}>
        <main className={styles.layout} id="top">
          <div className={styles.builderCol}>
            <BuilderColumn />
          </div>
          <div className={styles.reviewCol}>
            <ReviewPanel />
          </div>
        </main>
      </div>
    </BundleProvider>
  );
}
