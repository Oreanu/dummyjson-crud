"use client";

import { useEffect, useState } from "react";
import { useProductStore } from "@/state/useProductStore";
import Link from "next/link";
import { ProductCard } from "./ProductCard";
import { Product } from "@/types/interface/product";

interface Props {
  ssrProducts: Product[];
}

export default function HydratedProductList({ ssrProducts }: Props) {
  const storedProducts = useProductStore((state) => state.products);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  const displayProducts = hydrated && storedProducts.length > 0 ? storedProducts : ssrProducts;

  if (!displayProducts || displayProducts.length === 0) {
    return (
      <p className="col-span-full text-center text-gray-500">
        No products available.
      </p>
    );
  }

  return (
    <section className="mx-auto py-10 font-sofia-pro">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl lg:text-3xl font-bold tracking-tight text-gray-900">Products</h1>
        <Link
          href="/product/create"
          className="bg-[var(--orange-color-prep)] !text-[14px] lg:!text-[16px] text-white px-4 py-2 rounded-md transition-all"
        >
          + Add Product
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6">
        {displayProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
