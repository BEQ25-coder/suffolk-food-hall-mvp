import { readJsonArrayFile } from "@/lib/file-db";
import type { ApiProductItem } from "@/lib/types";

const PRODUCTS_FILE_NAME = "products.json";

function isValidProduct(value: unknown): value is ApiProductItem {
  if (!value || typeof value !== "object") {
    return false;
  }

  const product = value as Record<string, unknown>;

  return (
    typeof product.id === "string" &&
    typeof product.name === "string" &&
    typeof product.price === "number" &&
    typeof product.category === "string" &&
    typeof product.description === "string"
  );
}

export async function readProducts(): Promise<ApiProductItem[]> {
  const parsed = await readJsonArrayFile<unknown>(PRODUCTS_FILE_NAME);
  const products = parsed.filter(isValidProduct);

  if (products.length !== parsed.length) {
    throw new Error("Products store contains invalid product records.");
  }

  return products;
}

export async function readAvailableProducts(): Promise<ApiProductItem[]> {
  const products = await readProducts();
  return products.filter((product) => product.available !== false);
}
