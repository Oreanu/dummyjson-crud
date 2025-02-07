import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteProduct } from "@/lib/api";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export function useDeleteProduct(productId: string | number, redirectAfterDelete = false) {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: async () => deleteProduct(productId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      toast.success("Product deleted successfully!");

      if (redirectAfterDelete) {
        router.push("/");
      }
    },
    onError: () => {
      toast.error("Failed to delete product. Try again.");
    },
  });
}
