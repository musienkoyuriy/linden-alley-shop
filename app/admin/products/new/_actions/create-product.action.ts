'use server';

import { z } from 'zod';
import { ProductSchema } from "../../schemas";
import { createProduct, NewProduct } from "@/data-access/admin/products";

export const createProductAction = async (product: NewProduct): Promise<{
  success: boolean,
  message: string
}> => {
  try {
    const validationResult = ProductSchema.safeParse(product);

    if (!validationResult.success) {
      return { success: false, message: validationResult.error.issues[0].message };
    }

    const validatedData = validationResult.data;

    await createProduct(validatedData);

    return { success: true, message: 'Товар успішно створено!' };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, message: error.issues[0].message };
    }

    console.error('Error creating product:', error);
    return { success: false, message: 'Не вдалося створити товар. Спробуйте ще раз.' };
  }
}
