import { ShoppingBasket } from "lucide-react";
import type { ProductItem } from "@/lib/types";

export function ProductCard({
  product,
  onAddToBasket
}: {
  product: ProductItem;
  onAddToBasket?: (product: ProductItem) => void;
}) {
  return (
    <article className="rounded-2xl border border-[#eee] bg-white p-4 shadow-sm">
      <div className="flex items-center justify-between gap-3">
        <span className="rounded-full bg-cream px-3 py-1 text-xs font-medium text-bark">{product.tag}</span>
        <span className="text-sm font-semibold text-bark">{product.price}</span>
      </div>
      <h4 className="mt-3 text-base font-medium text-bark">{product.name}</h4>
      <p className="mt-2 text-sm leading-6 text-bark/70">{product.description}</p>
      <button
        type="button"
        onClick={() => onAddToBasket?.(product)}
        className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl border border-bark/10 bg-cream px-4 py-2 text-sm font-medium text-bark transition hover:bg-[#f4ead6] disabled:cursor-not-allowed disabled:opacity-50"
      >
        <ShoppingBasket className="h-4 w-4" />
        Add to basket
      </button>
    </article>
  );
}
