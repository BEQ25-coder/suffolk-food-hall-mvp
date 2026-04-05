"use client";

import { useEffect, useMemo, useState } from "react";
import { AppShell } from "@/components/AppShell";
import { ProductCard } from "@/components/ProductCard";
import { SectionCard } from "@/components/SectionCard";
import { StatusMessage } from "@/components/StatusMessage";
import { basketPreview } from "@/lib/demo-data";
import type { ApiProductItem, ProductItem, ProductsApiResponse } from "@/lib/types";

type BasketItem = {
  id: string;
  name: string;
  price: number;
};

function mapApiProductToCardProduct(product: ApiProductItem): ProductItem {
  return {
    id: product.id,
    name: product.name,
    price: `£${product.price.toFixed(2)}`,
    tag: product.category,
    description: product.description,
  };
}

function parsePrice(value: string): number {
  const numeric = Number(value.replace(/[^0-9.]/g, ""));
  return Number.isFinite(numeric) ? numeric : 0;
}

export default function ShopPage() {
  const [products, setProducts] = useState<ProductItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [basketItems, setBasketItems] = useState<BasketItem[]>(basketPreview);

  useEffect(() => {
    let isMounted = true;

    async function loadProducts() {
      try {
        setIsLoading(true);
        setError(null);

        const response = await fetch("/api/products", { cache: "no-store" });
        const result = (await response.json()) as ProductsApiResponse;

        if (!response.ok || !result.success) {
          throw new Error(result.success ? "We’re unable to load products right now. Please try again." : result.error);
        }

        if (!isMounted) {
          return;
        }

        setProducts(result.data.map(mapApiProductToCardProduct));
      } catch (caughtError) {
        if (!isMounted) {
          return;
        }

        setError(
          caughtError instanceof Error
            ? caughtError.message
            : "We’re unable to load products right now. Please try again."
        );
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    loadProducts();

    return () => {
      isMounted = false;
    };
  }, []);

  function handleAddToBasket(product: ProductItem) {
    setBasketItems((current) => [
      ...current,
      {
        id: `${product.id}-${current.length + 1}`,
        name: product.name,
        price: parsePrice(product.price),
      },
    ]);
  }

  const categories = useMemo(
    () => Array.from(new Set(products.map((product) => product.tag))),
    [products]
  );
  const basketTotal = useMemo(
    () => basketItems.reduce((sum, item) => sum + item.price, 0),
    [basketItems]
  );

  return (
    <AppShell>
      <SectionCard title="Shop highlights" subtitle="Browse">
        <p className="mb-4 text-sm leading-6 text-bark/70">
          Browse a selection of seasonal products available at Suffolk Food Hall.
        </p>
        <div className="flex flex-wrap gap-2">
          {!isLoading && !error && categories.map((category) => (
            <span key={category} className="rounded-full bg-cream px-3 py-2 text-xs font-medium text-bark">
              {category}
            </span>
          ))}
        </div>
      </SectionCard>

      <SectionCard title="Selected products" subtitle="Seasonal selection">
        {isLoading ? (
          <StatusMessage variant="loading">Loading products...</StatusMessage>
        ) : error ? (
          <StatusMessage variant="error">{error}</StatusMessage>
        ) : products.length === 0 ? (
          <StatusMessage variant="empty">No products available right now.</StatusMessage>
        ) : (
          <div className="space-y-4">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} onAddToBasket={handleAddToBasket} />
            ))}
          </div>
        )}
      </SectionCard>

      <SectionCard title="Basket summary" subtitle="Your selections">
        {basketItems.length === 0 ? (
          <StatusMessage variant="empty">Your basket is currently empty.</StatusMessage>
        ) : (
          <div className="space-y-4">
            {basketItems.map((item) => (
              <div key={item.id} className="flex items-center justify-between rounded-2xl border border-[#eee] bg-[#fffdf8] p-4 text-sm text-bark shadow-sm">
                <span>{item.name}</span>
                <span>£{item.price.toFixed(2)}</span>
              </div>
            ))}
          </div>
        )}
        <div className="mt-4 rounded-2xl border border-[#e7efe0] bg-[#f4f8f0] p-4 text-sm text-bark/80 shadow-sm">
          <p className="font-semibold text-bark">Estimated total: £{basketTotal.toFixed(2)}</p>
          <p className="mt-2 leading-6">
            Your basket reflects your selected items. Final totals may vary for weighed goods, and collection or delivery details are confirmed after your order is reviewed.
          </p>
        </div>
      </SectionCard>
    </AppShell>
  );
}
