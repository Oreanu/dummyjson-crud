import { z } from "zod";

export const productSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  category: z.string().optional(),
  price: z.preprocess((val) => Number(val), z.number().min(0.01, "Price must be greater than 0")),
  discountPercentage: z.preprocess((val) => (val ? Number(val) : undefined), z.number().min(0).max(100).optional()),
  rating: z.preprocess((val) => (val ? Number(val) : undefined), z.number().min(0).max(5).optional()),
  stock: z.preprocess((val) => Number(val), z.number().min(0, "Stock must be at least 0")),
  tags: z.array(z.string()).optional(),
  brand: z.string().optional(),
  sku: z.string().optional(),
  weight: z.preprocess((val) => (val ? Number(val) : undefined), z.number().min(0).optional()),
  dimensions: z
    .object({
      width: z.preprocess((val) => (val ? Number(val) : undefined), z.number().min(0)),
      height: z.preprocess((val) => (val ? Number(val) : undefined), z.number().min(0)),
      depth: z.preprocess((val) => (val ? Number(val) : undefined), z.number().min(0)),
    })
    .optional(),
  warrantyInformation: z.string().optional(),
  shippingInformation: z.string().optional(),
  availabilityStatus: z.string().optional(),
  reviews: z
    .array(
      z.object({
        rating: z.number().min(0).max(5),
        comment: z.string(),
        date: z.string(),
        reviewerName: z.string(),
        reviewerEmail: z.string().email(),
      })
    )
    .optional(),
  returnPolicy: z.string().optional(),
  minimumOrderQuantity: z.preprocess((val) => (val ? Number(val) : undefined), z.number().min(1).optional()),
  meta: z
    .object({
      createdAt: z.string(),
      updatedAt: z.string(),
      barcode: z.string().optional(),
      qrCode: z.string().optional(),
    })
    .optional(),
  thumbnail: z.string().url("Invalid URL format"),
  images: z.array(z.string().url()).optional(),
});

export type ProductFormData = z.infer<typeof productSchema>;
