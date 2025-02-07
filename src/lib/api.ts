import { Product } from "@/types/interface/product";
import axios, { AxiosError } from "axios";

export const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://dummyjson.com/products";

export const fetchProducts = async (): Promise<Product[]> => {
  try {
    const { data } = await axios.get(API_URL, {
      timeout: 5000,
    });
    return data.products;
  } catch (error) {
    const errMsg = (error as AxiosError<{ message?: string }>)?.response?.data?.message || "Failed to fetch products";
    console.error("[SERVER] Error fetching products:", error);
    throw new Error(errMsg);
  }
};

export const fetchProductById = async (id: string): Promise<Product> => {
  try {
    const { data } = await axios.get(`${API_URL}/${id}`);
    return data;
  } catch (error) {
    const errMsg = (error as AxiosError<{ message?: string }>)?.response?.data?.message || "Failed to fetch product";
    console.error("[SERVER] Error fetching product:", error);
    throw new Error(errMsg);
  }
};

export const createProduct = async (newProduct: Partial<Product>): Promise<Product> => {
  try {
    const { data } = await axios.post(`${API_URL}/add`, newProduct);
    return data;
  } catch (error) {
    const errMsg = (error as AxiosError<{ message?: string }>)?.response?.data?.message || "Failed to create product";
    console.error("[CLIENT] Error creating product:", error);
    throw new Error(errMsg);
  }
};

export const updateProduct = async ({
  id,
  updatedData,
}: {
  id: string;
  updatedData: Partial<Product>;
}): Promise<Product> => {
  try {
    const { data } = await axios.put(`${API_URL}/${id}`, updatedData);
    return data;
  } catch (error) {
    const errMsg = (error as AxiosError<{ message?: string }>)?.response?.data?.message || "Failed to update product";
    console.error("[CLIENT] Error updating product:", error);
    throw new Error(errMsg);
  }
};

export const deleteProduct = async (id: number | string): Promise<void> => {
  try {
    await axios.delete(`${API_URL}/${id}`);
  } catch (error) {
    const errMsg = (error as AxiosError<{ message?: string }>)?.response?.data?.message || "Failed to delete product";
    console.error("[CLIENT] Error deleting product:", error);
    throw new Error(errMsg);
  }
};
