"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useDeleteProduct } from "@/hooks/useDeleteProduct";
import { useProductStore } from "@/state/useProductStore";
import { Product } from "@/types/interface/product";
import OptimizedImage from "../../OptimizedImage";
import BackIcon from "../../svgs/BackIcon";

interface Props {
  ssrProduct?: Product | null;
  productId?: string;
}

export default function ProductDetails({ ssrProduct, productId }: Props) {
  const router = useRouter();
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  // Zustand store
  const storedProduct = useProductStore((state) => state.selectedProduct);
  const storedProducts = useProductStore((state) => state.products);

  // Ensure the page renders with SSR data first, then switches to Zustand data after hydration
  useEffect(() => {
    setHydrated(true);
  }, []);

  // Use SSR data initially, then Zustand data once hydrated and find product in Zustand store using the id (if provided)
  let product: Product | null = null;
  if (productId) {
    product = storedProducts.find((p) => p.id === Number(productId)) || null;
  }

  // Fall back to selectedProduct if no product found by id or no id provided
  if (!product && hydrated) {
    product = storedProduct || ssrProduct || null;
  }

  // Delete product mutation
  const deleteMutation = useDeleteProduct(product?.id ?? "", {
    redirect: true,
    onSuccessCallback: () => setDialogOpen(false),
  });

  // Show message if no product is found
  if (!product) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-500 text-center text-xl font-semibold">
          Product not found.
        </p>
      </div>
    );
  }

  const isOutOfStock = product.stock === 0;

  return (
    <div className="flex justify-center items-center min-h-screen py-6 px-0 lg:p-6">
      <Card className="w-full max-w-2xl px-2 lg:px-6 lg:py-4 !shadow-none border border-[var(--border-color)] bg-white !rounded-[20px] lg:!rounded-[32px] overflow-hidden">
        <CardHeader className="flex items-center justify-between border-b w-full !px-2 lg:!px-0 bg-white z-10 sticky pt-4 ">
          <div className="flex flex-col lg:flex-row items-center w-full">
            <div className="w-full lg:w-max mb-4 lg:mb-0">
              <Button
                onClick={() => router.back()}
                className="h-[32px] w-[32px] lg:w-[40px] lg:h-[40px] flex items-center justify-center rounded-full shadow-none bg-[#FBFBFB] hover:bg-[#FBFBFB] transition !p-0"
              >
                <BackIcon className="!h-[32px] !w-[32px] lg:!w-[40px] lg:!h-[40px]" />
              </Button>
            </div>
            <h2 className="text-[24px] lg:text-[34px] leading-snug pt-2 font-bold text-center flex-1">
              {product.title}
            </h2>
          </div>
        </CardHeader>

        <CardContent className="space-y-4 ">
          <div className="relative w-full h-[300px] flex justify-center items-center">
            <OptimizedImage
              src={product.thumbnail}
              alt={product.title}
              width={300}
              height={300}
              className="object-contain rounded-lg"
            />
          </div>

          <div className="text-center mt-4 bg-white z-10 sticky pt-4">
            <p className="text-gray-700 text-sm lg:text-md mt-2 font-medium">
              {product.description}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 text-gray-800 text-sm font-medium border-t pt-4">
            <p>
              <span className="font-bold">Brand:</span>{" "}
              {product.brand || "Unknown"}
            </p>
            <p>
              <span className="font-bold">Stock:</span>{" "}
              {isOutOfStock ? "Out of Stock" : `${product.stock} left`}
            </p>
            <p>
              <span className="font-bold">SKU:</span> {product.sku || "N/A"}
            </p>
            <p>
              <span className="font-bold">Warranty:</span>{" "}
              {product.warrantyInformation || "No warranty"}
            </p>
            <p>
              <span className="font-bold">Weight:</span>{" "}
              {product.weight ? `${product.weight}kg` : "N/A"}
            </p>
            <p>
              <span className="font-bold">Return Policy:</span>{" "}
              {product.returnPolicy || "Not specified"}
            </p>
            <p>
              <span className="font-bold">Shipping Info:</span>{" "}
              {product.shippingInformation || "Not available"}
            </p>
            <p>
              <span className="font-bold">Availability:</span>{" "}
              {product.availabilityStatus || "Unknown"}
            </p>
          </div>

          <div className="flex justify-between items-center mt-4">
            <span className="text-3xl font-bold text-[#FD5319]">
              ${product.price?.toFixed(2) || "N/A"}
            </span>
          </div>
        </CardContent>

        <CardFooter className="flex justify-between border-t pt-4 px-4 lg:px-0 gap-4">
          <Button
            className="flex items-center gap-2 px-4 py-2 text-white rounded-lg w-full !h-[52px] !mt-4 !text-[16px]"
            onClick={() => router.push(`/product/edit/${product.id}`)}
            disabled={isOutOfStock}
          >
            Edit
          </Button>

          <Dialog open={isDialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button
                variant="destructive"
                className="flex items-center gap-2 px-4 py-2 w-full !h-[52px] !text-[16px] !mt-4 bg-red-600 text-white rounded-lg hover:bg-red-700"
                disabled={isOutOfStock}
              >
                Delete
              </Button>
            </DialogTrigger>
            <DialogContent className="p-6 bg-white rounded-lg shadow-lg">
              <DialogHeader>
                <DialogTitle className="text-xl font-semibold text-gray-900">
                  Delete Product
                </DialogTitle>
                <p className="text-gray-600 text-md mt-2">
                  Are you sure you want to delete this product? This action
                  <span className="text-red-600 font-bold"> cannot</span> be
                  undone.
                </p>
              </DialogHeader>
              <DialogFooter className="flex gap-4">
                <DialogClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DialogClose>
                <Button
                  variant="destructive"
                  onClick={() => deleteMutation.mutate()}
                  disabled={deleteMutation.isPending}
                >
                  {deleteMutation.isPending ? "Deleting..." : "Confirm"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardFooter>
      </Card>
    </div>
  );
}
