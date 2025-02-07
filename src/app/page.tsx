import { prefetchQueryData } from "@/lib/reactQuery";
import { fetchProducts } from "@/lib/api";
import HydratedProductList from "@/components/products/HydratedProductList";

export const revalidate = 60;

export default async function ProductList() {
  const dehydratedState = await prefetchQueryData({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  return <HydratedProductList dehydratedState={dehydratedState} />;
}
