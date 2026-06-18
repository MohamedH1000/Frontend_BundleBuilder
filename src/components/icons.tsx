import type { ReactNode, SVGProps } from "react";

/**
 * Inline SVG icon set.
 *
 * Product photography from the source design couldn't be exported under the
 * Figma MCP rate limit, so each product is represented by a clean line glyph
 * that inherits `currentColor`. Keeping them inline means the repo is fully
 * self-contained (no binary assets to fetch) and every icon scales crisply.
 */

export type IconName =
  // product / step glyphs
  | "camera"
  | "pan"
  | "floodlight"
  | "doorbell"
  | "battery"
  | "motion"
  | "hub"
  | "entry"
  | "sdcard"
  | "keypad"
  | "truck"
  | "plan"
  | "shield"
  | "sensor"
  // ui
  | "chevron-up"
  | "chevron-down"
  | "plus"
  | "minus"
  | "check"
  | "close"
  | "info"
  | "seal";

const paths: Record<IconName, ReactNode> = {
  camera: (
    <>
      <rect x="3" y="6" width="13" height="9" rx="2.5" />
      <path d="M16 9.2 21 7v7l-5-2.2" />
      <circle cx="7" cy="10.5" r="1.6" />
      <path d="M9.5 15v3M6 18h6" />
    </>
  ),
  pan: (
    <>
      <rect x="3" y="7" width="11" height="8" rx="2.5" />
      <circle cx="7" cy="11" r="1.5" />
      <path d="M14 9.4 18 8" />
      <path d="M5 19c0-1.7 1.4-3 3-3M9 21c0-2.8 2.2-5 5-5" />
    </>
  ),
  floodlight: (
    <>
      <rect x="5" y="8" width="10" height="6" rx="2" />
      <path d="M15 10h2l3-2v8l-3-2h-2" />
      <path d="M4 6 2.5 4M8 5.5 7.5 3.5M12 5.5l.5-2" />
    </>
  ),
  doorbell: (
    <>
      <rect x="7" y="3" width="10" height="18" rx="3" />
      <circle cx="12" cy="10" r="2.2" />
      <path d="M10.5 14.5c.6.8 2.4.8 3 0" />
    </>
  ),
  battery: (
    <>
      <rect x="3" y="7" width="13" height="9" rx="2.5" />
      <path d="M16 10.5 19 9v5l-3-1.5" />
      <rect x="6.5" y="10" width="4" height="3" rx="0.6" />
      <path d="M8 19h4" />
    </>
  ),
  motion: (
    <>
      <circle cx="12" cy="12" r="3.2" />
      <path d="M6.3 6.3a8 8 0 0 0 0 11.4M17.7 6.3a8 8 0 0 1 0 11.4M9 9a4.2 4.2 0 0 0 0 6M15 9a4.2 4.2 0 0 1 0 6" />
    </>
  ),
  hub: (
    <>
      <rect x="3.5" y="4" width="17" height="13" rx="2.5" />
      <circle cx="8" cy="10.5" r="1.1" />
      <circle cx="12" cy="10.5" r="1.1" />
      <circle cx="16" cy="10.5" r="1.1" />
      <path d="M10 20h4" />
    </>
  ),
  entry: (
    <>
      <rect x="3.5" y="5" width="8" height="14" rx="1.5" />
      <rect x="12.5" y="5" width="8" height="14" rx="1.5" />
      <path d="M11.5 9v6" strokeDasharray="1.5 2" />
    </>
  ),
  sdcard: (
    <>
      <path d="M6 3h9l4 4v13a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Z" />
      <path d="M9 3v4M12 3v4M15 7v0" />
    </>
  ),
  keypad: (
    <>
      <rect x="5" y="3" width="14" height="18" rx="2.5" />
      <circle cx="9" cy="8" r="1" />
      <circle cx="12" cy="8" r="1" />
      <circle cx="15" cy="8" r="1" />
      <circle cx="9" cy="12" r="1" />
      <circle cx="12" cy="12" r="1" />
      <circle cx="15" cy="12" r="1" />
      <path d="M9.5 16h5" />
    </>
  ),
  truck: (
    <>
      <path d="M2 6.5h10v9H2z" />
      <path d="M12 9h4l3 3v3.5h-7" />
      <circle cx="6" cy="17.5" r="1.8" />
      <circle cx="16" cy="17.5" r="1.8" />
    </>
  ),
  plan: (
    <>
      <path d="M12 3 5 6v5.5c0 4.2 2.9 7.4 7 8.5 4.1-1.1 7-4.3 7-8.5V6l-7-3Z" />
      <path d="m10 9 5 3-5 3V9Z" />
    </>
  ),
  shield: (
    <>
      <path d="M12 3 5 6v5.5c0 4.2 2.9 7.4 7 8.5 4.1-1.1 7-4.3 7-8.5V6l-7-3Z" />
      <path d="m9 11.5 2 2 4-4" />
    </>
  ),
  sensor: (
    <>
      <path d="M4 9a8 8 0 0 1 16 0" />
      <path d="M7.5 11a4.5 4.5 0 0 1 9 0" />
      <circle cx="12" cy="15" r="1.6" />
      <path d="M12 16.6V20" />
    </>
  ),
  "chevron-up": <path d="m6 14 6-5 6 5" />,
  "chevron-down": <path d="m6 10 6 5 6-5" />,
  plus: <path d="M12 5v14M5 12h14" />,
  minus: <path d="M5 12h14" />,
  check: <path d="m4 12 5 5 11-11" />,
  close: <path d="M6 6l12 12M18 6 6 18" />,
  info: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 11v5M12 7.6h.01" />
    </>
  ),
  seal: (
    <>
      <path d="M12 2.5 14.3 4l3-.2 1 2.8 2.4 1.7-1 2.8 1 2.8-2.4 1.7-1 2.8-3-.2L12 21.5 9.7 20l-3 .2-1-2.8L3.3 15.7l1-2.8-1-2.8 2.4-1.7 1-2.8 3 .2L12 2.5Z" />
      <path d="m8.5 12 2.3 2.3 4.7-4.7" />
    </>
  ),
};

interface IconProps extends Omit<SVGProps<SVGSVGElement>, "name"> {
  name: IconName;
  size?: number;
  decorative?: boolean;
}

export function Icon({ name, size = 20, decorative = true, ...rest }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      role={decorative ? undefined : "img"}
      aria-hidden={decorative || undefined}
      {...rest}
    >
      {paths[name]}
    </svg>
  );
}
