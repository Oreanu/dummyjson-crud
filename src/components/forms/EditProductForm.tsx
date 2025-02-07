"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useForm, FieldValues } from "react-hook-form";
import { updateProduct } from "@/lib/api";
import { Product } from "@/types/interface/product";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, } from "@/components/ui/card";
import { ArrowLeft, Loader2 } from "lucide-react";

interface Props {
  product: Product;
}

export default function EditProductForm({ product }: Props) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FieldValues>({
    defaultValues: product,
  });

  const router = useRouter();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (updatedData: Partial<Product>) =>
      updateProduct({ id: String(product.id), updatedData }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      reset();
      router.push("/");
    },
  });

  return (
    <div className="flex justify-center items-center h-screen">
      <Card className="w-full max-w-xl p-6 -mt-16">
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
            Edit Product
          </h2>
        </CardHeader>

        <CardContent>
          <form
            onSubmit={handleSubmit((updatedData) =>
              mutation.mutate(updatedData)
            )}
            className="space-y-4"
          >
            <div>
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                {...register("title", { required: "Title is required" })}
                placeholder="Enter title"
              />
              {errors.title?.message && (
                <p className="text-red-500 text-sm">
                  {String(errors.title?.message)}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                {...register("description")}
                placeholder="Enter description"
              />
            </div>

            <div>
              <Label htmlFor="price">Price</Label>
              <Input
                id="price"
                type="number"
                {...register("price", { required: "Price is required" })}
                placeholder="Enter price"
              />
              {errors.price?.message && (
                <p className="text-red-500 text-sm">
                  {String(errors.price?.message)}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="thumbnail">Image URL</Label>
              <Input
                id="thumbnail"
                {...register("thumbnail")}
                placeholder="Enter image URL"
              />
            </div>

            {mutation.isError && (
              <p className="text-red-500">
                Error updating product. Please try again.
              </p>
            )}

            <Button
              type="submit"
              className="w-full"
              disabled={isSubmitting || mutation.status === "pending"}
            >
              {mutation.status === "pending" ? (
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
