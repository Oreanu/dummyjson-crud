import { useMutation } from "@tanstack/react-query";
import { createProduct } from "@/lib/api";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useProductStore } from "@/state/useProductStore";

export function useAddProduct() {
  const router = useRouter();
  const addProduct = useProductStore((state) => state.addProduct);

  return useMutation({
    mutationFn: createProduct,
    onSuccess: (newProduct) => {
      addProduct(newProduct);
      toast.success("Product added successfully!");

      setTimeout(() => {
        router.push("/");
      }, 100);
    },
    onError: () => {
      toast.error("Failed to add product. Please try again.");
    },
  });
}
