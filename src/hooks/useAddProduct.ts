import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createProduct } from "@/lib/api";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export function useAddProduct() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      toast.success("Product added successfully!");
      router.push("/");
    },
    onError: () => {
      toast.error("Failed to add product. Please try again.");
    },
  });
}
