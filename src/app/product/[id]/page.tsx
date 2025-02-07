import { prefetchQueryData } from "@/lib/reactQuery";
import { API_URL, fetchProductById } from "@/lib/api";
import ProductDetails from "@/components/products/ProductDetails";
import { Metadata } from "next";
import Hydrate from "@/lib/providers/Hydrate";
import { Product } from "@/types/interface/product";

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
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
    queryFn: () => fetchProductById(id),
  });

  let product: Product | null = null;
  try {
    product = await fetchProductById(id);
  } catch (error) {
    console.error("Failed to fetch product:", error);
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-500 text-center">
          Error loading product details. Please try again.
        </p>
      </div>
    );
  }

  return (
    <Hydrate state={dehydratedState}>
      <ProductDetails product={product} />
    </Hydrate>
  );
}
