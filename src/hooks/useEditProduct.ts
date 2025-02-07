"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProduct } from "@/lib/api";
import { Product } from "@/types/interface/product";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export function useEditProduct(productId: string | number, onSuccessCallback?: () => void) {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: async (updatedData: Partial<Product>) =>
      updateProduct({ id: String(productId), updatedData }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      toast.success("Product updated successfully!");

      if (onSuccessCallback) onSuccessCallback();
      router.push("/");
    },
    onError: (error) => {
      const errorMessage = error instanceof Error ? error.message : "Unexpected error occurred.";
      toast.error(`Failed to update product: ${errorMessage}`);
    },
  });
}
