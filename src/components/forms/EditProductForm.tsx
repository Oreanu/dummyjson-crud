"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEditProduct } from "@/hooks/useEditProduct";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  productSchema,
  ProductFormData,
} from "@/types/schema/validationSchema";
import { ProductFormField } from "@/components/forms/ProductFormField";
import { Product } from "@/types/interface/product";
import BackIcon from "@/components/svgs/BackIcon";

interface Props {
  product: Product;
}

export default function EditProductForm({ product }: Props) {
  const router = useRouter();
  const mutation = useEditProduct(product.id, () => reset());

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: product,
  });

  const onSubmit = async (updatedData: ProductFormData) => {
    try {
      await mutation.mutateAsync(updatedData);
    } catch (error) {
      console.error("Failed to update product:", error);
    }
  };

  return (
    <div className="flex justify-center items-center lg:h-screen">
      <Card className="w-full max-w-xl px-2 py-0 !shadow-none !border-[var(--border-color)] !rounded-[32px] mt-8 lg:mt-4">
        <CardHeader className="flex items-center justify-between w-full !px-0">
          <div className="flex flex-col lg:flex-row items-center w-full">
            <div className="w-full lg:w-max">
              <Button
                onClick={() => router.back()}
                className="h-[32px] w-[32px] lg:w-[40px] lg:h-[40px] flex items-center justify-center rounded-full shadow-none bg-[#FBFBFB] hover:bg-[#FBFBFB] transition !p-0"
              >
                <BackIcon className="!h-[32px] !w-[32px] lg:!w-[40px] lg:!h-[40px] " />
              </Button>
            </div>
            <h2 className="text-[24px] lg:text-[34px] leading-snug pt-2 font-bold text-center flex-1">
              Edit Product
            </h2>
          </div>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <ProductFormField
              label="Title"
              id="title"
              control={control}
              rules={{ required: "Title is required" }}
              placeholder="Enter product title"
              error={errors.title?.message}
            />

            <ProductFormField
              label="Description"
              id="description"
              control={control}
              placeholder="Enter product description"
              error={errors.description?.message}
              isTextarea
            />

            <ProductFormField
              label="Price"
              id="price"
              control={control}
              type="number"
              placeholder="Enter product price"
              error={errors.price?.message}
              parseNumber
            />

            <ProductFormField
              label="Stock"
              id="stock"
              control={control}
              type="number"
              placeholder="Enter stock quantity"
              error={errors.stock?.message}
              parseNumber
            />

            <ProductFormField
              label="Image URL"
              id="thumbnail"
              control={control}
              placeholder="Enter product image URL"
              error={errors.thumbnail?.message}
            />

            <Button
              type="submit"
              className="w-full !h-[52px] !text-[16px] !mt-8"
              disabled={isSubmitting || mutation.isPending}
            >
              {mutation.isPending ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="animate-spin w-4 h-4" />
                  Updating...
                </span>
              ) : (
                "Update Product"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
