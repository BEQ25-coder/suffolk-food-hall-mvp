import { NextResponse } from "next/server";
import { readAvailableProducts } from "@/lib/products-store";
import type { ProductsApiResponse } from "@/lib/types";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const products = await readAvailableProducts();

    const response: ProductsApiResponse = {
      success: true,
      data: products,
      empty: products.length === 0,
    };

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error("GET /api/products failed:", error);

    const response: ProductsApiResponse = {
      success: false,
      error: "Failed to load products",
    };

    return NextResponse.json(response, { status: 500 });
  }
}
