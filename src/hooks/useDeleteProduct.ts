import { useMutation } from "@tanstack/react-query";
import { deleteProduct } from "@/lib/api";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useProductStore } from "@/state/useProductStore";

export function useDeleteProduct(
  productId: number | string,
  options?: { redirect?: boolean; onSuccessCallback?: () => void }
) {
  const router = useRouter();
  const deleteProductFromStore = useProductStore((state) => state.deleteProduct);

  return useMutation({
    mutationFn: async () => {
      if (typeof productId === "number" && productId > 1000) {
        console.warn(`Skipping API call for productId: ${productId}`);
        return null; // Prevent API call
      }
      return deleteProduct(productId);
    },
    onSuccess: () => {
      deleteProductFromStore(productId); // Persist deletion
      toast.success("Product deleted successfully!");

      if (options?.onSuccessCallback) {
        options.onSuccessCallback();
      }

      if (options?.redirect) {
        router.push("/");
      }
    },
    onError: (error) => {
      console.error("Delete Product Error:", error);
      toast.error("Failed to delete product. Please try again.");
    },
  });
}
