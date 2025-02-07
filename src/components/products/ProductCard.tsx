"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useDeleteProduct } from "@/hooks/useDeleteProduct";
import Image from "next/image";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Product } from "@/types/interface/product";
import { Badge } from "@/components/ui/badge";
import { Eye, Info, Loader2, Pencil, Trash } from "lucide-react";

export function ProductCard({ product }: { product: Product }) {
  const isOutOfStock = product.stock === 0;
  const deleteMutation = useDeleteProduct(product.id);

  return (
    <Card className="group overflow-hidden transition-all hover:shadow-lg rounded-xl border border-gray-200 shadow-lg bg-card ">
      <CardHeader className="relative w-full h-52 overflow-hidden">
        <div className="relative w-full h-full overflow-hidden">
          <div className="absolute top-3 left-3 flex gap-2">
            {product.tags?.includes("new") && (
              <Badge variant="outline" className="bg-[#FFB515] text-white">
                NEW
              </Badge>
            )}
            {product.tags?.includes("beauty") && (
              <Badge variant="outline" className="bg-green-600 text-white">
                BEAUTY
              </Badge>
            )}
          </div>
          <div className="absolute top-3 right-3">
            {isOutOfStock ? (
              <Badge variant="destructive">Out of Stock</Badge>
            ) : (
              <Badge
                variant="outline"
                className="bg-[#139654] text-white sticky z-10"
              >
                In Stock
              </Badge>
            )}
          </div>

          <div className="relative w-full h-full transform transition-transform duration-300 ease-in-out group-hover:scale-105">
            <Image
              src={product.thumbnail}
              alt={product.title}
              fill
              className="object-contain rounded-t-lg"
            />
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-4">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg font-semibold text-[#EC6031]">
            {product.title}
          </CardTitle>
          <Info className="w-5 h-5 text-gray-500 hover:text-gray-800 cursor-pointer" />
        </div>
        <p className="text-gray-600 text-sm mt-1">
          {product.description.substring(0, 50)}...
        </p>
        <p className="text-lg font-bold text-gray-800 mt-2">
          ${product.price.toFixed(2)}
        </p>
      </CardContent>

      <CardFooter className="flex justify-between px-4 pb-4 items-center">
        <Link href={`/product/${product.id}`} passHref>
          <Button
            variant="ghost"
            className="flex items-center gap-2 text-gray-700 hover:bg-gray-100"
          >
            <Eye className="w-4 h-4" />
            View
          </Button>
        </Link>

        <Link href={`/product/edit/${product.id}`} passHref>
          <Button
            variant="outline"
            className={`flex items-center gap-2 ${
              isOutOfStock
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-[#FFB515] hover:text-black"
            }`}
            disabled={isOutOfStock}
          >
            <Pencil className="w-4 h-4" />
            Edit
          </Button>
        </Link>

        <Dialog>
          <DialogTrigger asChild>
            <Button
              variant="destructive"
              className={`flex items-center gap-2 transition-all hover:bg-red-600 hover:text-white ${
                isOutOfStock ? "opacity-50 cursor-not-allowed" : ""
              }`}
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
  );
}
