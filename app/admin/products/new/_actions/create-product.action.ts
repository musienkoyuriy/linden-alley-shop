'use server';

import { db } from "@/db";
import { products, productImages } from "@/db/schema";
import { z } from 'zod';
import { InferInsertModel } from "drizzle-orm";
import { ProductSchema } from "../schemas";

type Product = Omit<InferInsertModel<typeof products>, 'id'>;

export const createProduct = async (
  product: Product & { images: string[] }
): Promise<{ success: boolean, message: string }> => {
  try {
    const validationResult = ProductSchema.safeParse(product);

    if (!validationResult.success) {
      return { success: false, message: validationResult.error.issues[0].message };
    }

    const validatedData = validationResult.data;
    const { images, ...productData } = validatedData;

    const [newProduct] = await db.insert(products)
      .values(productData)
      .returning();

    await db.insert(productImages)
      .values(
        images.map(url => ({
          productId: newProduct.id,
          url
        }))
      );

    return { success: true, message: 'Product created successfully!' };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, message: error.issues[0].message };
    }

    console.error('Error creating product:', error);
    return { success: false, message: 'Failed to create product' };
  }
}
