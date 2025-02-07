import { prefetchQueryData } from "@/lib/reactQuery";
import { fetchProducts } from "@/lib/api";
import HydratedProductList from "@/components/products/ui/HydratedProductList";
import Hydrate from "@/lib/providers/Hydrate";
import PersistProducts from "@/components/products/zustand/PersistProducts";

export const revalidate = 60; 

export default async function ProductList() {
  const products = await fetchProducts(); 
  const dehydratedState = await prefetchQueryData({
    queryKey: ["products"],
    queryFn: async () => products,
  });

  return (
    <Hydrate state={dehydratedState}>
      <HydratedProductList ssrProducts={products} />
      <PersistProducts products={products} />
    </Hydrate>
  );
}
