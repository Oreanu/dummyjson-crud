import EditProductForm from "@/components/forms/EditProductForm";
import { API_URL, fetchProductById } from "@/lib/api";
import { Product } from "@/types/interface/product";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
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

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params; 

  let product: Product | null = null;
  
  try {
    product = await fetchProductById(id);
  } catch (error) {
    console.error("Failed to fetch product:", error);
    return <p>Error loading product details.</p>;
  }

  return <EditProductForm product={product} />;
}
