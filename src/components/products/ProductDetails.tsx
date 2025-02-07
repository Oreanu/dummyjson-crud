"use client";
import React from "react";
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
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/navigation";
import { ArrowLeft, Trash, Pencil, Loader2 } from "lucide-react";
import { useDeleteProduct } from "@/hooks/useDeleteProduct";
import { Product } from "@/types/interface/product";
import OptimizedImage from "../OptimizedImage";

interface Props {
  product: Product | null;
}
export default function ProductDetails({ product }: Props) {
  const router = useRouter();
  const [isDialogOpen, setDialogOpen] = React.useState(false);

  const deleteMutation = useDeleteProduct(product?.id ?? "", {
    redirect: true,
    onSuccessCallback: () => setDialogOpen(false),
  });

  if (!product) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-500 text-center">⚠️ Product not found.</p>
      </div>
    );
  }

  const isOutOfStock = product.stock === 0;

  return (
    <div className="flex justify-center items-center h-screen">
      <Card className="w-full max-w-xl shadow-md -mt-16">
        <CardHeader className="flex flex-row w-full items-center justify-between">
          <Button
            variant="ghost"
            className="bg-primary/5"
            onClick={() => router.push("/")}
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <Badge variant="outline">{product.category || "Uncategorized"}</Badge>
        </CardHeader>

        <CardContent className="space-y-1">
          <AspectRatio
            ratio={16 / 9}
            className="rounded-md overflow-hidden w-3/4 mx-auto"
          >
            {product.thumbnail ? (
              <OptimizedImage
                src={product.thumbnail}
                alt={product.title}
                fill
                className="w-full h-full object-contain"
              />
            ) : (
              <div className="h-48 w-full bg-gray-200 flex items-center justify-center text-gray-500">
                No Image Available
              </div>
            )}
          </AspectRatio>

          <CardTitle className="text-lg font-semibold text-center">
            {product.title}
          </CardTitle>
          <p className="text-gray-600 text-sm line-clamp-2">
            {product.description}
          </p>

          <div className="grid grid-cols-2 gap-2 text-sm text-gray-700">
            <p>
              <span className="font-semibold">Brand:</span>{" "}
              {product.brand || "Unknown"}
            </p>
            <p>
              <span className="font-semibold">Stock:</span>{" "}
              {isOutOfStock ? "Out of Stock" : `${product.stock} left`}
            </p>
            <p>
              <span className="font-semibold">SKU:</span> {product.sku || "N/A"}
            </p>
            <p>
              <span className="font-semibold">Warranty:</span>{" "}
              {product.warrantyInformation || "No warranty"}
            </p>
          </div>

          <div className="flex justify-between items-center mt-2">
            <span className="text-xl font-semibold text-[#FD5319]">
              ${product.price?.toFixed(2) || "N/A"}
            </span>
            <Badge variant="secondary">
              {product.availabilityStatus || "Unknown"}
            </Badge>
          </div>
        </CardContent>

        <CardFooter className="flex justify-between">
          <Button
            className="flex items-center gap-2"
            onClick={() => router.push(`/product/edit/${product.id}`)}
            disabled={isOutOfStock}
          >
            <Pencil className="w-4 h-4" />
            Edit
          </Button>

          <Dialog open={isDialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button
                variant="destructive"
                className="flex items-center gap-2"
                disabled={isOutOfStock}
              >
                <Trash className="w-4 h-4" />
                Delete
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
              <DialogFooter>
                <DialogClose asChild>
                  <Button
                    variant="outline"
                    className="hover:bg-gray-100"
                    onClick={() => setDialogOpen(false)}
                  >
                    Cancel
                  </Button>
                </DialogClose>
                <Button
                  variant="destructive"
                  className="flex items-center gap-2 hover:bg-red-700"
                  onClick={() => deleteMutation.mutate()}
                  disabled={deleteMutation.isPending}
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
