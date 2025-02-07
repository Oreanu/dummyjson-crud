"use client";

import { useEffect } from "react";
import { useProductStore } from "@/state/useProductStore";
import { Product } from "@/types/interface/product";

interface Props {
  product: Product;
}

export default function PersistProductDetails({ product }: Props) {
  const setSelectedProduct = useProductStore((state) => state.setSelectedProduct);
  const storedProduct = useProductStore((state) => state.selectedProduct);

  useEffect(() => {
    if (!storedProduct || storedProduct.id !== product.id) {
      setSelectedProduct(product); 
    }
  }, [product, setSelectedProduct, storedProduct]);

  return null; 
}
