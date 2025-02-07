import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteProduct } from "@/lib/api";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export function useDeleteProduct(
  productId: string | number,
  options?: { redirect?: boolean; onSuccessCallback?: () => void }
) {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: async () => deleteProduct(productId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
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
