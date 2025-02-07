import { Product } from '@/types/interface/product';
import axios from 'axios';

export const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://dummyjson.com/products";

export const fetchProducts = async (): Promise<Product[]> => {
  try {
    const { data } = await axios.get(API_URL, {
      timeout: 5000, 
    });
    return data.products;
  } catch (error) {
    console.error("[SERVER] Error fetching products:", error);
    throw new Error("Failed to fetch products");
  }
};

export const fetchProductById = async (id: string): Promise<Product> => {
  try {
    const { data } = await axios.get(`${API_URL}/${id}`);
    return data;
  } catch (error) {
    console.error("[SERVER] Error fetching product:", error);
    throw new Error("Failed to fetch product");
  }
};

export const createProduct = async (newProduct: Partial<Product>): Promise<Product> => {
  console.log("[CLIENT] Creating new product:", newProduct);
  try {
    const { data } = await axios.post(`${API_URL}/add`, newProduct);
    return data;
  } catch (error) {
    console.error("[CLIENT] Error creating product:", error);
    throw new Error("Failed to create product");
  }
};


export const updateProduct = async ({
  id,
  updatedData,
}: {
  id: string;
  updatedData: Partial<Product>;
}): Promise<Product> => {
  console.log(`[CLIENT] Updating product ${id}`, updatedData);
  try {
    const { data } = await axios.put(`${API_URL}/${id}`, updatedData);
    return data;
  } catch (error) {
    console.error("[CLIENT] Error updating product:", error);
    throw new Error("Failed to update product");
  }
};

export const deleteProduct = async (id: number | string): Promise<void> => {
  console.log(`[CLIENT] Deleting product with ID: ${id}`);
  try {
    await axios.delete(`${API_URL}/${id}`);
  } catch (error) {
    console.error("[CLIENT] Error deleting product:", error);
    throw new Error("Failed to delete product");
  }
};