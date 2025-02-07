"use client";

import { useEffect } from "react";
import { useProductStore } from "@/state/useProductStore";
import { Product } from "@/types/interface/product";

interface Props {
  products: Product[];
}

export default function PersistProducts({ products }: Props) {
  const setProducts = useProductStore((state) => state.setProducts);
  const storedProducts = useProductStore.getState().products;

  useEffect(() => {
    if (storedProducts.length === 0) {
      setProducts(products);
    }
  }, [products, setProducts, storedProducts.length]);

  return null; 
}
