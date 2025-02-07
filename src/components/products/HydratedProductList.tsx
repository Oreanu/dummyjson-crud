"use client";

import { Product } from "@/types/interface/product";
import Link from "next/link";
import { ProductCard } from "./ProductCard";

interface Props {
  products: Product[];
}

export default function HydratedProductList({ products }: Props) {
  if (!products || products.length === 0) {
    return (
      <p className="col-span-full text-center text-gray-500">
        No products available.
      </p>
    );
  }

  return (
    <section className="mx-auto py-10 font-sofia-pro">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">Products</h1>
        <Link href="/product/create" className="bg-[#EB6033] text-white px-4 py-2 rounded-md transition-all">
          + Add Product
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
