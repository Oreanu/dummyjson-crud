"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { useDeleteProduct } from "@/hooks/useDeleteProduct";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Product } from "@/types/interface/product";
import { Badge } from "@/components/ui/badge";
import React from "react";
import OptimizedImage from "../../OptimizedImage";
import EditIcon from "@/components/svgs/EditIcon";
import DeleteIcon from "@/components/svgs/DeleteIcon";
import ForwardIcon from "@/components/svgs/ForwardIcon";
import { useRouter } from "next/navigation";

export function ProductCard({ product }: { product: Product }) {
  const isOutOfStock = product.stock === 0;
  const [isDialogOpen, setDialogOpen] = React.useState(false);

  const router = useRouter();

  const deleteMutation = useDeleteProduct(product.id, {
    onSuccessCallback: () => setDialogOpen(false),
  });

  const handleCardClick = (e: React.MouseEvent) => {
    if (e.target instanceof HTMLElement && e.target.closest("button")) {
      return;
    }

    router.push(`/product/${product.id}`);
  };

  return (
    <Card
      onClick={handleCardClick}
      className="shadow-none !p-0 overflow-hidden !border-[var(--border-color)] !cursor-pointer"
    >
      <CardHeader className="relative w-full h-72 bg-[var(--background-light-2)] flex flex-col justify-between !pl-0 !pt-4 !pr-0">
        <div className="flex justify-between items-start w-full !pr-4">
          <Badge
            variant="outline"
            className="bg-[var(--success-color)] !shadow-none text-white px-3 py-1 !rounded-t-[23px] !rounded-l-[0px] !border-0 !rounded-r-[23px] !rounded-b-[23px] !h-[32px] !text-[10px] lg:!text-[12px] uppercase sticky z-10"
          >
            {isOutOfStock ? "Out of Stock" : "In Stock"}
          </Badge>
          <div className="flex gap-2 sticky z-10">
            <Button
              onClick={(e) => {
                e.stopPropagation();
                router.push(`/product/edit/${product.id}`);
              }}
              className="h-[36px] w-[36px] lg:w-[48px] lg:h-[48px] flex items-center justify-center rounded-full shadow-none bg-[#FBFBFB] hover:bg-[#FBFBFB] transition !p-0"
            >
              <EditIcon className="!h-[36px] !w-[36px]  lg:!w-[48px] lg:!h-[48px]" />
            </Button>

            <Dialog open={isDialogOpen} onOpenChange={setDialogOpen}>
              <DialogTrigger asChild>
                <Button
                  onClick={(e) => e.stopPropagation()}
                  className="h-[36px] w-[36px] lg:w-[48px] lg:h-[48px] flex items-center justify-center bg-[#FBFBFB] hover:bg-[#FBFBFB] shadow-none rounded-full transition !p-0"
                >
                  <DeleteIcon className="!h-[36px] !w-[36px]  lg:!w-[48px] lg:!h-[48px]" />
                </Button>
              </DialogTrigger>
              <DialogContent className="p-6">
                <DialogHeader>
                  <DialogTitle className="text-lg font-semibold text-gray-900">
                    Delete Product
                  </DialogTitle>
                  <p className="text-gray-600 text-sm mt-2">
                    Are you sure you want to delete this product? This action{" "}
                    <span className="text-red-600 font-semibold">cannot</span>{" "}
                    be undone.
                  </p>
                </DialogHeader>
                <DialogFooter className="flex justify-between mt-4">
                  <DialogClose asChild>
                    <Button variant="outline" className="hover:bg-gray-100">
                      Cancel
                    </Button>
                  </DialogClose>
                  <Button
                    variant="destructive"
                    className="flex items-center gap-2 hover:bg-red-700"
                    onClick={() => deleteMutation.mutate()}
                    disabled={deleteMutation.isPending || isOutOfStock}
                  >
                    {deleteMutation.isPending ? "Deleting..." : "Confirm"}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
        <div className="relative w-full h-[300px] flex justify-center items-center ">
          <OptimizedImage
            src={product.thumbnail}
            alt={product.title}
            width={300}
            height={300}
            className="object-contain rounded-lg -mt-20"
          />
        </div>
      </CardHeader>

      <CardContent className="p-4 bg-white sticky z-10">
        <h3 className="text-sm lg:text-lg font-semibold text-[var(--orange-color-prep)] uppercase truncate whitespace-nowrap overflow-hidden text-ellipsis">
          {product.title}
        </h3>
        <p className="text-xs lg:text-sm mt-1 text-[#5C5C5C] font-thin">
          {product.description.substring(0, 50)}...
        </p>
        <div className="h-[1px] w-full bg-[#F0F0F0] mt-4"></div>
      </CardContent>

      <CardFooter className="flex justify-between px-4 pb-4 items-center">
        <p className="text-[20px] lg:text-[26px] font-bold text-[#160804] mt-2">
          ${product.price.toFixed(2)}
        </p>
        <Button
          onClick={(e) => {
            e.stopPropagation();
            router.push(`/product/${product.id}`);
          }}
          className="h-[36px] w-[36px] lg:w-[48px] lg:h-[48px] flex items-center justify-center rounded-full shadow-none bg-[#FBFBFB] hover:bg-[#FBFBFB] transition !p-0"
        >
          <ForwardIcon className="!h-[36px] !w-[36px]  lg:!w-[48px] lg:!h-[48px]" />
        </Button>
      </CardFooter>
    </Card>
  );
}
