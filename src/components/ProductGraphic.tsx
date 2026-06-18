import type { Product } from "../types";
import { Icon, type IconName } from "./icons";
import { cn } from "../lib/cn";

const IMAGE_RE = /\.(png|jpe?g|webp|svg|gif|avif)$/i;

/** True when a product's `icon` value is an image path/URL, not a glyph name. */
function isProductImage(icon: string): boolean {
  return (
    icon.startsWith("/") ||
    icon.startsWith("http") ||
    icon.startsWith("data:") ||
    IMAGE_RE.test(icon)
  );
}

interface ProductGraphicProps {
  product: Product;
  /** Size for the fallback glyph; an `<img>` fills its parent instead. */
  iconSize: number;
  className?: string;
}

/**
 * Renders a product's artwork: an `<img>` when `product.icon` is a path/URL
 * (e.g. "/assets/Wyze Cam v4.png"), otherwise the inline SVG glyph by name.
 * Used by both the product card (large slot) and the review thumbnail, so an
 * asset added in the catalog shows up in both places automatically.
 */
export function ProductGraphic({ product, iconSize, className }: ProductGraphicProps) {
  if (isProductImage(product.icon)) {
    return (
      <img
        src={encodeURI(product.icon)}
        alt={product.name}
        loading="lazy"
        className={cn("h-full w-full object-contain", className)}
      />
    );
  }
  return <Icon name={product.icon as IconName} size={iconSize} className={className} />;
}
