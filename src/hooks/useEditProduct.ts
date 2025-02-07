import { useMutation } from "@tanstack/react-query";
import { updateProduct } from "@/lib/api";
import { Product } from "@/types/interface/product";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useProductStore } from "@/state/useProductStore";
import { useCallback } from "react";

export function useEditProduct(productId: number | string, onSuccessCallback?: () => void) {
  const router = useRouter();
  const updateProductInStore = useProductStore((state) => state.updateProduct);
  const setSelectedProduct = useProductStore((state) => state.setSelectedProduct);

  // Ensure mutation function is stable across renders
  const mutationFn = useCallback(
    async (updatedData: Partial<Product>) => {
      if (typeof productId === "number" && productId > 1000) {
        console.warn(`Skipping API call for productId: ${productId}`);

        // Return a simulated product with a fully defined structure
        return {
          id: Number(productId),
          title: updatedData.title ?? "Default Title",
          description: updatedData.description ?? "",
          category: updatedData.category ?? "",
          price: updatedData.price ?? 0,
          discountPercentage: updatedData.discountPercentage ?? 0,
          rating: updatedData.rating ?? 0,
          stock: updatedData.stock ?? 0,
          brand: updatedData.brand ?? "",
          thumbnail: updatedData.thumbnail ?? "",
          images: updatedData.images ?? [],
        } as Product;
      }

      return updateProduct({ id: String(productId), updatedData });
    },
    [productId] // Dependency array ensures `mutationFn` doesn't change on every render
  );

  // Ensure the mutation hook is always called in the same order
  const mutation = useMutation({
    mutationFn,
    onSuccess: (updatedProduct) => {
      updateProductInStore(updatedProduct);
      setSelectedProduct(updatedProduct);

      toast.success("Product updated successfully!");
      if (onSuccessCallback) onSuccessCallback();
      router.push("/");
    },
    onError: (error) => {
      const errorMessage = error instanceof Error ? error.message : "Unexpected error occurred.";
      toast.error(`Failed to update product: ${errorMessage}`);
    },
  });

  return mutation;
}
