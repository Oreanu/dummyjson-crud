"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchProductById } from "@/lib/api";
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/navigation";
import { ArrowLeft, Trash, Pencil, Loader2 } from "lucide-react";
import Image from "next/image";
import { useDeleteProduct } from "@/hooks/useDeleteProduct";

interface Props {
  productId: string;
}

export default function ProductDetails({ productId }: Props) {
  const router = useRouter();
  const {
    data: product,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["product", productId],
    queryFn: () => fetchProductById(productId),
    staleTime: 1000 * 60 * 5,
  });

  const deleteMutation = useDeleteProduct(productId, true);
  const isOutOfStock = (product?.stock ?? 0) === 0;

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Card className="w-full max-w-md p-4 space-y-3">
          <Skeleton className="h-6 w-3/4" />
          <Skeleton className="h-48 w-full rounded-md" />
          <Skeleton className="h-4 w-1/2" />
        </Card>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-500">⚠️ Failed to load product details.</p>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <Card className="w-full max-w-md p-4 shadow-lg -mt-16">
        <CardHeader className="flex flex-row w-full items-center justify-between">
          <Button
            variant="ghost"
            className="bg-primary/5"
            onClick={() => router.push("/")}
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <Badge variant="outline">
            {product?.category || "Uncategorized"}
          </Badge>
        </CardHeader>

        <CardContent className="space-y-3">
          <AspectRatio ratio={16 / 9} className="rounded-md overflow-hidden">
            {product?.thumbnail ? (
              <Image
                width={400}
                height={250}
                src={product?.thumbnail}
                alt={product?.title}
                className="w-full h-full object-contain"
              />
            ) : (
              <Skeleton className="h-full w-full" />
            )}
          </AspectRatio>

          <CardTitle className="text-lg font-semibold text-center">
            {product?.title}
          </CardTitle>

          <p className="text-gray-600 text-sm line-clamp-2">
            {product?.description}
          </p>

          <div className="grid grid-cols-2 gap-2 text-sm text-gray-700">
            <p>
              <span className="font-semibold">Brand:</span>{" "}
              {product?.brand || "Unknown"}
            </p>
            <p>
              <span className="font-semibold">Stock:</span>{" "}
              {isOutOfStock ? "Out of Stock" : `${product?.stock} left`}
            </p>
            <p>
              <span className="font-semibold">SKU:</span>{" "}
              {product?.sku || "N/A"}
            </p>
            <p>
              <span className="font-semibold">Warranty:</span>{" "}
              {product?.warrantyInformation || "No warranty"}
            </p>
          </div>

          {/* Price & Availability */}
          <div className="flex justify-between items-center mt-2">
            <span className="text-xl font-semibold text-[#FD5319]">
              ${product?.price?.toFixed(2) || "N/A"}
            </span>
            <Badge variant="secondary">
              {product?.availabilityStatus || "Unknown"}
            </Badge>
          </div>
        </CardContent>

        <CardFooter className="flex justify-between">
          <Button
            className="flex items-center gap-2"
            onClick={() => router.push(`/product/edit/${product?.id}`)}
            disabled={isOutOfStock}
          >
            <Pencil className="w-4 h-4" />
            Edit
          </Button>
          {/* <Button
            variant="destructive"
            className="flex items-center gap-2"
            onClick={() => deleteMutation.mutate()}
            disabled={deleteMutation.isPending || isOutOfStock}
          >
            {deleteMutation.isPending ? (
              <>
                <Trash className="w-4 h-4 animate-pulse" />
                Deleting...
              </>
            ) : (
              <>
                <Trash className="w-4 h-4" />
                Delete
              </>
            )}
          </Button> */}
          <Dialog>
            <DialogTrigger asChild>
              <Button
                variant="destructive"
                className="flex items-center gap-2"
                disabled={isOutOfStock}
              >
                {deleteMutation.isPending ? (
                  <>
                    <Trash className="w-4 h-4 animate-pulse" />
                    Deleting...
                  </>
                ) : (
                  <>
                    <Trash className="w-4 h-4" />
                    Delete
                  </>
                )}
              </Button>
            </DialogTrigger>

            <DialogContent className="p-6">
              <DialogHeader>
                <DialogTitle className="text-lg font-semibold text-gray-900">
                  Delete Product
                </DialogTitle>
                <p className="text-gray-600 text-sm mt-2">
                  Are you sure you want to delete this product? This action{" "}
                  <span className="text-red-600 font-semibold">cannot</span> be
                  undone.
                </p>
              </DialogHeader>

              <DialogFooter className="flex justify-between mt-4">
                <Button
                  variant="outline"
                  className="hover:bg-gray-100"
                  onClick={() => deleteMutation.reset()}
                >
                  Cancel
                </Button>
                <Button
                  variant="destructive"
                  className="flex items-center gap-2 hover:bg-red-700"
                  onClick={() => deleteMutation.mutate()}
                  disabled={deleteMutation.isPending || isOutOfStock}
                >
                  {deleteMutation.isPending ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Deleting...
                    </>
                  ) : (
                    <>
                      <Trash className="w-4 h-4" />
                      Confirm
                    </>
                  )}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardFooter>
      </Card>
    </div>
  );
}
