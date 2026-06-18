import { BundleProvider } from "./state/BundleProvider";
import { BuilderColumn } from "./features/builder/BuilderColumn";
import { ReviewPanel } from "./features/review/ReviewPanel";
import { Icon } from "./components/icons";
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
        <header className={styles.topbar}>
          <a className={styles.brand} href="#top">
            <span className={styles.brandMark} aria-hidden>
              <Icon name="shield" size={22} />
            </span>
            <span className={styles.brandName}>Wyze&nbsp;Security</span>
          </a>
          <span className={styles.brandSub}>Bundle Builder</span>
        </header>

        <main className={styles.layout} id="top">
          <div className={styles.builderCol}>
            <BuilderColumn />
          </div>
          <div className={styles.reviewCol}>
            <ReviewPanel />
          </div>
        </main>

        <footer className={styles.footer}>
          A take-home prototype · selections auto-save to your browser
        </footer>
      </div>
    </BundleProvider>
  );
}
