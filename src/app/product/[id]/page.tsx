import { prefetchQueryData } from "@/lib/reactQuery";
import { API_URL, fetchProductById } from "@/lib/api";
import ProductDetails from "@/components/products/ProductDetails";
import { HydrationBoundary } from "@tanstack/react-query";
import { Metadata } from "next";

interface ProductPageProps {
  params: Promise<{ id: string }>;  
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { id } = await params; 
  const res = await fetch(`${API_URL}/${id}`);
  
  if (!res.ok) {
    throw new Error(`Failed to fetch product: ${id}`);
  }
  
  const product = await res.json();

  return {
    title: `${product.title} - DummyJSONCRUD`,
    description: product.description,
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params; 
  
  const dehydratedState = await prefetchQueryData({
    queryKey: ["product", id],
    queryFn: async () => await fetchProductById(id),
  });

  return (
    <HydrationBoundary state={dehydratedState}>
      <ProductDetails productId={id} />
    </HydrationBoundary>
  );
}
