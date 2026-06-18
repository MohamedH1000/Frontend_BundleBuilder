/** Join class names, dropping falsy values. Keeps conditional className readable. */
export function cn(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(" ");
}
