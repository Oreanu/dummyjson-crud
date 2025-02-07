"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchProducts } from "@/lib/api";
import { Product } from "@/types/interface/product";
import Link from "next/link";
import { ProductCard } from "./ProductCard";
import { DehydratedState } from "@tanstack/react-query";

interface Props {
  dehydratedState: DehydratedState; 
}

export default function HydratedProductList({ dehydratedState }: Props) {
  const queryClient = useQueryClient();

  const productsData: Product[] | undefined = dehydratedState.queries?.find(
    (query) => query.queryKey[0] === "products"
  )?.state?.data as Product[] | undefined;

  if (productsData) {
    queryClient.setQueryData(["products"], productsData);
  }

  const { data: products, isLoading, error } = useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: fetchProducts,
    staleTime: 1000 * 60 * 5, 
    initialData: productsData, 
  });

  if (isLoading) return <p className="text-center">Loading products...</p>;
  if (error) return <p className="text-red-500 text-center">Error fetching products.</p>;

  return (
    <section className="mx-auto py-10 font-sofia-pro">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">Products</h1>
        <Link
          href="/product/create"
          className="bg-[#EB6033] text-white px-4 py-2 rounded-md transition-all"
        >
          + Add Product
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products && products.length > 0 ? (
          products.map((product) => <ProductCard key={product.id} product={product} />)
        ) : (
          <p className="col-span-full text-center text-gray-500">No products available.</p>
        )}
      </div>
    </section>
  );
}
