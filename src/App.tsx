import { BundleProvider } from "./state/BundleProvider";
import { BuilderColumn } from "./features/builder/BuilderColumn";
import { ReviewPanel } from "./features/review/ReviewPanel";

/**
 * App shell: the two-column experience — the builder accordion on the left and
 * the live review panel on the right (sticky on desktop, stacked below the
 * builder on smaller screens). Header/footer were removed per request.
 */
export default function App() {
  return (
    <BundleProvider>
      <div className="flex min-h-full flex-col bg-white">
        <main
          id="top"
          className="mx-auto grid w-full max-w-[1196px] flex-1 grid-cols-1 gap-5 px-4 pb-10 pt-5 lg:grid-cols-[minmax(0,1fr)_399px] lg:items-start lg:gap-[29px] lg:px-6 lg:pb-12 lg:pt-7 xl:pt-9"
        >
          <div>
            <BuilderColumn />
          </div>
          <div className="review-scroll lg:sticky lg:top-6 lg:max-h-[calc(100vh-48px)] lg:overflow-y-auto">
            <ReviewPanel />
          </div>
        </main>
      </div>
    </BundleProvider>
  );
}
