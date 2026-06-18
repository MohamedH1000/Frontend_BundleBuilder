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

/* ----------------------------------------------------------------------------
 * Step-header icons
 *
 * Some step glyphs are supplied as exact, brand-coloured artwork from the design
 * (fixed fills/strokes) rather than currentColor line art. Those get their own
 * components, and `StepIcon` routes by name so call-sites stay data-driven.
 * -------------------------------------------------------------------------- */

interface StepIconProps {
  name: string;
  size?: number;
  className?: string;
}

/** The HMS shield — the "Choose your plan" step emblem, lifted verbatim from
 *  the design (light fill #F0F0F0 + #6F7882 outline). */
export function ShieldHmsIcon({ size = 26, className }: { size?: number; className?: string }) {
  const height = Math.round((size * 27) / 26);
  return (
    <svg
      width={size}
      height={height}
      viewBox="0 0 26 27"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
    >
      <path
        d="M4.22186 5.25454C4.22186 5.25454 2.86035 5.49907 2.86035 6.64875V15.0139C2.86035 19.4874 9.42646 24.4657 11.6584 25.9445C12.1032 26.2419 12.6787 26.2419 13.1234 25.9445C15.3554 24.4657 21.9215 19.4874 21.9215 15.0139V6.64875C21.9215 5.49907 20.56 5.25454 20.56 5.25454L13.1811 2.92959C12.6665 2.76745 12.1154 2.76745 11.6008 2.92959L4.22186 5.25454Z"
        fill="#F0F0F0"
      />
      <path
        d="M5.87139 4.26114C5.89408 4.25692 5.9165 4.25134 5.93852 4.2444L13.3175 1.91943C13.7209 1.79232 14.153 1.79232 14.5565 1.91943L21.9354 4.2444C21.9574 4.25134 21.9798 4.25692 22.0025 4.26114C22.0034 4.26131 22.0044 4.26147 22.0053 4.26165L22.0049 4.26157L22.0042 4.26144L22.0031 4.26124L22.0059 4.26182C22.0105 4.26278 22.0195 4.26471 22.0321 4.26774C22.0575 4.27383 22.0969 4.28417 22.1455 4.29975C22.2449 4.33156 22.3716 4.38175 22.4933 4.45499C22.7361 4.60112 22.893 4.78996 22.893 5.08273V13.4479C22.893 14.4251 22.5326 15.4715 21.9116 16.5397C21.2926 17.6046 20.4356 18.655 19.4948 19.6291C17.6126 21.578 15.4492 23.1663 14.355 23.8913L14.3529 23.8927C14.1002 24.0617 13.7737 24.0617 13.521 23.8927L13.5189 23.8913C12.4247 23.1663 10.2613 21.578 8.37912 19.6291C7.43837 18.655 6.58128 17.6046 5.9623 16.5397C5.3413 15.4715 4.98096 14.4251 4.98096 13.4479V5.08273C4.98096 4.78996 5.13776 4.60112 5.38057 4.45499C5.50228 4.38175 5.62907 4.33156 5.72837 4.29975C5.77699 4.28417 5.8164 4.27383 5.84178 4.26774C5.85441 4.26471 5.86336 4.26278 5.86802 4.26182L5.87139 4.26114ZM5.86901 4.26157L5.86896 4.26158C5.86899 4.26157 5.86903 4.26157 5.86906 4.26157L5.86901 4.26157Z"
        stroke="#6F7882"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** "Choose your cameras" step emblem — a security camera on a stand (#6F7882).
 *  The source <clipPath> clipped to the full 26×26 canvas (a no-op), so it's
 *  omitted here for a cleaner React node. */
export function CameraStepIcon({ size = 26, className }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 26 26"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      stroke="#6F7882"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M8.6665 24.9166V20.5833" />
      <path d="M17.3335 24.9166V20.5833" />
      <path d="M22.75 24.9167L3.25 24.9167" />
      <path d="M13 5.14581C15.2436 5.14581 17.0625 6.96473 17.0625 9.20831C17.0625 11.4519 15.2436 13.2708 13 13.2708C10.7564 13.2708 8.9375 11.4519 8.9375 9.20831C8.9375 6.96473 10.7564 5.14581 13 5.14581Z" />
      <path
        d="M12.9731 16.25C12.7489 16.25 12.5669 16.432 12.5669 16.6562C12.5669 16.8805 12.7489 17.0625 12.9731 17.0625C13.1974 17.0625 13.3794 16.8805 13.3794 16.6562C13.3794 16.432 13.1974 16.25 12.9731 16.25Z"
        fill="#6F7882"
      />
      <rect x="3.1875" y="0.75" width="19.625" height="19.625" rx="3.25" />
    </svg>
  );
}

/** "Choose your sensors" step emblem — a device emitting signal arcs (#6F7882). */
export function SensorStepIcon({ size = 28, className }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      stroke="#6F7882"
      strokeWidth={1.55}
      strokeMiterlimit={10}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M19.5526 7.13056C19.5526 7.82389 19.0904 8.28611 18.3971 8.28611H9.15263C8.45929 8.28611 7.99707 7.82389 7.99707 7.13056V1.93058C7.99707 1.23725 8.45929 0.775024 9.15263 0.775024H18.3971C19.0904 0.775024 19.5526 1.23725 19.5526 1.93058V7.13056Z" />
      <path d="M11.8101 4.2417V4.81948" />
      <path d="M15.855 4.2417V4.81948" />
      <path d="M19.1625 13.5441C16.2346 16.4329 11.3156 16.4329 8.3877 13.5441" />
      <path d="M22.9104 17.2419C17.8744 22.2108 9.67617 22.2108 4.64014 17.2419" />
      <path d="M26.7749 21.6328C19.5136 28.5661 8.03616 28.4505 0.774902 21.5172" />
    </svg>
  );
}

/** "Add extra protection" step emblem — a keypad with an up-arrow (#6F7882). */
export function KeypadStepIcon({ size = 26, className }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 26 26"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      stroke="#6F7882"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M16.478 6.47826L12.9997 3L9.52148 6.47826" />
      <path d="M8.07204 10.174C8.07204 10.5776 7.91171 10.9646 7.62633 11.25C7.34095 11.5354 6.95389 11.6957 6.5503 11.6957H5.53639C5.1328 11.6957 4.74574 11.5354 4.46036 11.25C4.17497 10.9646 4.01465 10.5776 4.01465 10.174C4.01465 9.77037 4.17497 9.38331 4.46036 9.09793C4.74574 8.81255 5.1328 8.65222 5.53639 8.65222H6.5503C6.95389 8.65222 7.34095 8.81255 7.62633 9.09793C7.91171 9.38331 8.07204 9.77037 8.07204 10.174Z" />
      <path d="M15.0286 10.174C15.0286 10.5776 14.8683 10.9646 14.5829 11.25C14.2975 11.5354 13.9104 11.6957 13.5068 11.6957H12.4929C12.0893 11.6957 11.7023 11.5354 11.4169 11.25C11.1315 10.9646 10.9712 10.5776 10.9712 10.174C10.9712 9.77037 11.1315 9.38331 11.4169 9.09793C11.7023 8.81255 12.0893 8.65222 12.4929 8.65222H13.5068C13.9104 8.65222 14.2975 8.81255 14.5829 9.09793C14.8683 9.38331 15.0286 9.77037 15.0286 10.174Z" />
      <path d="M21.9851 10.174C21.9851 10.5776 21.8248 10.9646 21.5394 11.25C21.254 11.5354 20.867 11.6957 20.4634 11.6957H19.4495C19.0459 11.6957 18.6588 11.5354 18.3734 11.25C18.0881 10.9646 17.9277 10.5776 17.9277 10.174C17.9277 9.77037 18.0881 9.38331 18.3734 9.09793C18.6588 8.81255 19.0459 8.65222 19.4495 8.65222H20.4634C20.867 8.65222 21.254 8.81255 21.5394 9.09793C21.8248 9.38331 21.9851 9.77037 21.9851 10.174Z" />
      <path d="M8.07204 15.8261C8.07204 16.2297 7.91171 16.6167 7.62633 16.9021C7.34095 17.1875 6.95389 17.3478 6.5503 17.3478H5.53639C5.1328 17.3478 4.74574 17.1875 4.46036 16.9021C4.17497 16.6167 4.01465 16.2297 4.01465 15.8261C4.01465 15.4225 4.17497 15.0354 4.46036 14.75C4.74574 14.4646 5.1328 14.3043 5.53639 14.3043H6.5503C6.95389 14.3043 7.34095 14.4646 7.62633 14.75C7.91171 15.0354 8.07204 15.4225 8.07204 15.8261Z" />
      <path d="M15.0286 15.8261C15.0286 16.2297 14.8683 16.6167 14.5829 16.9021C14.2975 17.1875 13.9104 17.3478 13.5068 17.3478H12.4929C12.0893 17.3478 11.7023 17.1875 11.4169 16.9021C11.1315 16.6167 10.9712 16.2297 10.9712 15.8261C10.9712 15.4225 11.1315 15.0354 11.4169 14.75C11.7023 14.4646 12.0893 14.3043 12.4929 14.3043H13.5068C13.9104 14.3043 14.2975 14.4646 14.5829 14.75C14.8683 15.0354 15.0286 15.4225 15.0286 15.8261Z" />
      <path d="M21.9851 15.8261C21.9851 16.2297 21.8248 16.6167 21.5394 16.9021C21.254 17.1875 20.867 17.3478 20.4634 17.3478H19.4495C19.0459 17.3478 18.6588 17.1875 18.3734 16.9021C18.0881 16.6167 17.9277 16.2297 17.9277 15.8261C17.9277 15.4225 18.0881 15.0354 18.3734 14.75C18.6588 14.4646 19.0459 14.3043 19.4495 14.3043H20.4634C20.867 14.3043 21.254 14.4646 21.5394 14.75C21.8248 15.0354 21.9851 15.4225 21.9851 15.8261Z" />
      <path d="M8.07204 21.4783C8.07204 21.8819 7.91171 22.2689 7.62633 22.5543C7.34095 22.8397 6.95389 23 6.5503 23H5.53639C5.1328 23 4.74574 22.8397 4.46036 22.5543C4.17497 22.2689 4.01465 21.8819 4.01465 21.4783C4.01465 21.0747 4.17497 20.6876 4.46036 20.4023C4.74574 20.1169 5.1328 19.9565 5.53639 19.9565H6.5503C6.95389 19.9565 7.34095 20.1169 7.62633 20.4023C7.91171 20.6876 8.07204 21.0747 8.07204 21.4783Z" />
      <path d="M15.0286 21.4783C15.0286 21.8819 14.8683 22.2689 14.5829 22.5543C14.2975 22.8397 13.9104 23 13.5068 23H12.4929C12.0893 23 11.7023 22.8397 11.4169 22.5543C11.1315 22.2689 10.9712 21.8819 10.9712 21.4783C10.9712 21.0747 11.1315 20.6876 11.4169 20.4023C11.7023 20.1169 12.0893 19.9565 12.4929 19.9565H13.5068C13.9104 19.9565 14.2975 20.1169 14.5829 20.4023C14.8683 20.6876 15.0286 21.0747 15.0286 21.4783Z" />
      <path d="M21.9851 21.4783C21.9851 21.8819 21.8248 22.2689 21.5394 22.5543C21.254 22.8397 20.867 23 20.4634 23H19.4495C19.0459 23 18.6588 22.8397 18.3734 22.5543C18.0881 22.2689 17.9277 21.8819 17.9277 21.4783C17.9277 21.0747 18.0881 20.6876 18.3734 20.4023C18.6588 20.1169 19.0459 19.9565 19.4495 19.9565H20.4634C20.867 19.9565 21.254 20.1169 21.5394 20.4023C21.8248 20.6876 21.9851 21.0747 21.9851 21.4783Z" />
    </svg>
  );
}

/** Route a step's icon name to the right component (line glyph or brand artwork). */
export function StepIcon({ name, size = 26, className }: StepIconProps) {
  if (name === "camera-art") return <CameraStepIcon size={size} className={className} />;
  if (name === "shield-hms") return <ShieldHmsIcon size={size} className={className} />;
  if (name === "sensor-art") return <SensorStepIcon size={size} className={className} />;
  if (name === "keypad-art") return <KeypadStepIcon size={size} className={className} />;
  return <Icon name={name as IconName} size={size} className={className} />;
}
