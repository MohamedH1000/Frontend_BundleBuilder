const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

/** $1,299.00 */
export function formatMoney(value: number): string {
  return currency.format(value);
}

/** $9.99/mo — for recurring plan pricing. */
export function formatRecurring(value: number): string {
  return `${currency.format(value)}/mo`;
}

/** Round to 2 decimals, avoiding float drift (e.g. 0.1 + 0.2). */
export function round2(value: number): number {
  return Math.round((value + Number.EPSILON) * 100) / 100;
}
