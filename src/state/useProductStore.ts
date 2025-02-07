import { Product } from "@/types/interface/product";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { devtools } from "zustand/middleware";

interface ProductStore {
  products: Product[];
  selectedProduct: Product | null;
  productCounter: number;
  setSelectedProduct: (product: Product | null) => void;
  setProducts: (products: Product[]) => void;
  addProduct: (product: Omit<Product, "id">) => void;
  updateProduct: (updatedProduct: Product) => void;
  deleteProduct: (productId: number | string) => void;
}

export const useProductStore = create<ProductStore>()(
  devtools(
    persist(
      (set,) => ({
        products: [],
        selectedProduct: null,
        productCounter: 1000,

        setSelectedProduct: (product) =>
          set({ selectedProduct: product }, false, "setSelectedProduct"),

        setProducts: (products) => {
          const maxExistingId = Math.max(...products.map((p) => p.id), 1000);
          set({ products, productCounter: maxExistingId + 1 }, false, "setProducts");
        },

        addProduct: (product) =>
          set((state) => {
            const newId = state.productCounter + 1;
            const newProduct = { ...product, id: newId };
            return {
              products: [newProduct, ...state.products],
              productCounter: newId,
            };
          }, false, "addProduct"),

        updateProduct: (updatedProduct) =>
          set((state) => ({
            products: state.products.map((product) =>
              product.id === updatedProduct.id
                ? { ...product, ...updatedProduct }
                : product
            ),
          }), false, "updateProduct"),

        deleteProduct: (productId) =>
          set((state) => ({
            products: state.products.filter((product) => product.id !== productId),
          }), false, "deleteProduct"),
        resetStore: () => {
          useProductStore.persist.clearStorage();
          set(
            { products: [], selectedProduct: null, productCounter: 1000 },
            false,
            "resetStore"
          );
          window.location.reload(); 
        },
      }),
      {
        name: "product-store",
        storage: createJSONStorage(() => localStorage),
      }
    ),
    { name: "Product Store", enabled: process.env.NODE_ENV === "development" }
  )
);
