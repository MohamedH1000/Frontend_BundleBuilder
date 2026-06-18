# Bundle Builder — Your Security System

A multi-step **bundle builder** for a home-security system, with a live **review
panel** beside it. Built as a React + TypeScript prototype the way I'd build
production UI I'm proud of: data-driven, well-typed, cleanly layered, and fully
responsive.

The shopper walks a 4-step accordion (cameras → plan → sensors → extras), and
the right-hand summary recalculates instantly as they pick colour variants and
quantities. Their system auto-saves to `localStorage`, and **"Save my system for
later"** persists it so a reload or return visit restores everything exactly.

---

## Run it

Requires **Node 18+** (built and verified on Node 22).

```bash
npm install      # install dependencies
npm run dev      # start the dev server  → http://localhost:5173
```

Other scripts:

```bash
npm run build    # type-check (tsc) + production build
npm run preview  # preview the production build
npm test         # run the pricing-engine unit tests (Vitest)
npm run lint     # ESLint
```

It builds and runs from a clean clone — no extra services required.

---

## What's implemented (mapped to the brief)

| Requirement | Status |
| --- | --- |
| Desktop fidelity (layout, spacing, type, colour, radii, states) | ✅ Driven from the source design data; see *Fidelity notes* |
| Responsive down to phone | ✅ Two-column → single-column at `< 1024px`, card grids collapse, sticky review becomes static |
| Variant selector — each variant has its own quantity | ✅ Per-colour keys; switching colour binds the stepper to that colour's count |
| Review reflects every variant with count > 0 as its own line | ✅ |
| Quantity steppers in sync across cards ↔ review | ✅ Both read/write the same selection key through context |
| Accordion — expand/collapse, Step 1 open on load | ✅ One open at a time; click an open step to collapse it |
| "N selected" counter per step (distinct products) | ✅ |
| Live review panel, total recalculates | ✅ Pure pricing engine |
| Data-driven from JSON | ✅ `src/data/catalog.json` renders everything |
| Persistence — "Save my system for later" | ✅ Auto-save on every change **and** explicit save; versioned `localStorage`, restored on reload |
| Checkout | ✅ Placeholder confirmation (no backend) |

### The variant selector (the tricky part)

- Quantities are keyed `${productId}::${variantId}`, so Red and Blue of the same
  camera are tracked separately.
- The card's stepper is bound to the **active** variant. Selecting a colour makes
  it active; the stepper shows that colour's count. Add 2 White, switch to Black
  → the stepper reads **0** (Black's count); White (×2) is untouched.
- The review lists **each colour with a count > 0 as its own line**, with a small
  swatch + label so you can tell them apart. Selecting Black does **not** remove
  the White line.
- Products with no variants (the doorbell) simply have no chip row — one stepper.
- A per-chip count badge makes the independent-quantity behaviour legible.

---

## Architecture

Layered and dependency-inverted: UI components never touch storage or build the
next state — they dispatch intent through a context, and a pure pricing engine
derives every number.

```
src/
  types.ts                     # domain model (Product, Variant, Step, SelectionState…)
  data/
    catalog.json               # the single source of truth — products, variants, prices
    catalog.ts                 # typed wrapper + helpers (selectionKey, getVariant…)
    seed.ts                    # initial selection (matches the design on load)
  lib/
    pricing.ts                 # PURE money engine: line totals, subtotals, savings, financing
    format.ts                  # currency formatting + round2
  state/
    reducer.ts                 # the only authority over state mutation (typed actions)
    persistence.ts             # versioned localStorage (load / save / clear + validation)
    BundleProvider.tsx         # context: state + derived summary/lines + action callbacks
  components/                  # presentational, reusable
    icons.tsx                  # inline SVG set (no binary assets)
    QuantityStepper.tsx        # shared by cards and review → stays in sync for free
    VariantSelector.tsx        # colour chips
    Price.tsx                  # compare-at / active / FREE / recurring
    ProductCard.tsx            # data-driven card (badge, variants, stepper, price, selected state)
  features/
    builder/                   # BuilderColumn + StepSection (accordion)
    review/                    # ReviewPanel + ReviewLineItem
  App.tsx                      # shell: top bar + two-column responsive layout
```

### Principles & patterns

- **Single source of truth / DRY.** One catalog, one selection state, one pricing
  engine. Every price on screen is computed from unit prices — nothing is
  hard-coded per product.
- **Pure core, thin shell.** `pricing.ts` has zero React/storage deps, so the
  money math is trivially unit-tested (9 tests, all green).
- **Reduction + Context (state machine).** All mutations flow through a typed
  `reducer`; components dispatch intent (`increment`, `selectVariant`,
  `toggleStep`…) rather than mutating — Dependency Inversion via the action
  contract.
- **Open/Closed.** Add a product/variant/step by editing `catalog.json` — no
  component changes.
- **Persistence as a side-effect boundary.** `persistence.ts` is the only thing
  that touches `localStorage`; the provider wires it in via an effect.
- **Design tokens.** All colour/spacing/radius/motion values live as CSS custom
  properties in `index.css`, so re-theming is a one-file change.

---

## Decisions, tradeoffs & known gaps

These are the honest "here's what I did and why" notes.

### 1. Colours were sampled from the design, not guessed

The Figma account used by my tooling hit the **Starter-plan MCP rate limit**
before I could export the desktop "builder" screenshot, so I extracted colours a
different way: I decoded the exported review-panel PNG with a small Node script
and sampled real pixels. The brand indigo `#4e2fd2` (Checkout button, active
prices), the savings green `#0aa288`, the review-panel blue `#edf4ff`, the
near-black headings and the struck-price grey are all **actual values from the
file**.

A few tokens belong to elements that only appear in the desktop builder view
(selected-card border, the "Save X%" badge fill), which I couldn't sample. I
reused the confirmed tokens for those — **selected border = brand indigo**,
**badge = savings green** — and they're clearly isolated as CSS variables
(`--brand`, `--success`) so they're a one-line tweak once the file is accessible.

### 2. Product imagery is represented by clean SVG icons

The source design uses product photos as image fills. Those binary assets
couldn't be exported under the rate limit, and hot-linking them would make the
repo non-self-contained. Each product therefore renders a tasteful line glyph
(`src/components/icons.tsx`) that inherits the brand colour. Swapping in real
`<img>`s later is a one-prop change on `ProductCard`.

### 3. The design's Pan v3 pricing is internally inconsistent — I picked a side

In the file, the **Wyze Cam Pan v3 card** shows unit prices **$39.98 / $34.98**,
but its own **review line** shows **$57.98 / $47.98** for a quantity of 2 — and
`2 × $34.98 = $69.96`, not `$47.98`. The two can't both be right for one SKU.

I chose the **card unit price as canonical** (it's the per-item price a shopper
actually sees, keeps the "Save 12%" badge correct, and preserves a sensible
price hierarchy). Line totals and the grand total are then *computed* from those
unit prices — so all the math is internally consistent and recalculates live.

Concretely, on the seed selection this yields a **savings of $50.92** (which
matches the design exactly), an active total of **$209.87** and a compare total
of **$260.79** (the design shows $187.89 / $238.81 — the gap is entirely the Pan
v3 discrepancy rippling through the design's hand-typed totals). The unit-test
suite locks these numbers in.

### 4. Only Step 1 (cameras) is designed in the source file

The Figma only ships the **expanded** Step 1; Steps 2–4 exist as collapsed
headers and as review line items, but their selectable cards were never drawn.
I built Steps 2–4 with the **same card component**, seeded from the products the
review already names (Cam Unlimited plan, Motion Sensor, required Sense Hub,
256GB card, fast shipping). To make "Choose your plan / sensors / extras" real
*choices* rather than single-item steps, I added a small number of genuine Wyze
products (Cam Plus tier, Entry Sensor, 64GB card, Sense Keypad) — all clearly
catalog data, none selected by default, so the app still loads looking exactly
like the design.

### 5. "Save my system for later" over-delivers

Selections **auto-persist on every change**, so the system is always recoverable
even without clicking the link. The link additionally does an explicit write and
shows a "Saved!" confirmation, matching the brief's "configure → save → leave →
return → still there" exactly. Storage is versioned (`bundleBuilder.selection.v1`)
and validated on load, so a future schema change won't crash on stale data.

### 6. Financing line

The "as low as $X/mo" figure is an equal 12-month split of the active total
(honest, 0%-APR estimate). The design's `$19.19/mo` is a static marketing number
that doesn't derive cleanly from the shown total, so I compute it instead.

---

## Fidelity notes / what I'd refine with full Figma access

- Confirm the desktop-only tokens (selected-card border, badge fill) against the
  builder view and adjust the two CSS variables if needed.
- Drop in the real product photos.
- Verify the exact heading/eyebrow type sizes against the desktop frame (sizes
  here are tuned to the captured layout).

---

## Tech

React 19 · TypeScript (strict) · Vite · CSS Modules + design tokens · Vitest.
No UI kit, no state library — intentionally dependency-light to show the craft.
