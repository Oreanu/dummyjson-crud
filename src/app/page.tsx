import { prefetchQueryData } from "@/lib/reactQuery";
import { fetchProducts } from "@/lib/api";
import HydratedProductList from "@/components/products/HydratedProductList";
import Hydrate from "@/lib/providers/Hydrate";

export const revalidate = 60;

export default async function ProductList() {
  const products = await fetchProducts();

  const dehydratedState = await prefetchQueryData({
    queryKey: ["products"],
    queryFn: async () => products,
  });

  return (
    <Hydrate state={dehydratedState}>
      <HydratedProductList products={products} />
    </Hydrate>
  );
}
