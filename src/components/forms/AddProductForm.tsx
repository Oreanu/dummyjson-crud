"use client";

import { useForm, } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAddProduct } from "@/hooks/useAddProduct";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Loader2, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  productSchema,
  ProductFormData,
} from "@/types/schema/validationSchema";
import { ProductFormField } from "@/components/forms/ProductFormField";

export default function AddProductForm() {
  const router = useRouter();
  const mutation = useAddProduct();
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      title: "",
      description: "",
      price: 0,
      stock: 1,
      brand: "",
      category: "",
      thumbnail: "",
    },
  });

  const onSubmit = async (data: ProductFormData) => {
    try {
      await mutation.mutateAsync(data);
    } catch (error) {
      console.error("Failed to add product:", error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <Card className="w-full max-w-lg px-2 py-0 shadow-md -mt-16">
        <CardHeader className="flex items-center justify-between">
          <div className="w-full">
            <Button
              variant="ghost"
              onClick={() => router.back()}
              className="bg-primary/5 flex items-center gap-2"
            >
              <ArrowLeft className="w-5 h-5" />
              Back
            </Button>
          </div>
          <h2 className="text-2xl font-bold text-center flex-grow">
            Add New Product
          </h2>
        </CardHeader>

        <CardContent>
          <form
            onSubmit={(e) => {
              handleSubmit((data) => {
                onSubmit(data);
              })(e);
            }}
            className="space-y-4"
          >
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
              label="Image URL"
              id="thumbnail"
              control={control}
              placeholder="Enter image URL"
              error={errors.thumbnail?.message}
            />

            <Button
              type="submit"
              className="w-full h-10"
              disabled={isSubmitting || mutation.isPending}
            >
              {mutation.isPending ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="animate-spin w-4 h-4" />
                  Adding Product...
                </span>
              ) : (
                "Add Product"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
