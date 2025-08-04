import z from "zod";

export const ProductSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  images: z.array(z.string()).min(1, 'At least one image is required'),
  price: z.number().positive('Price must be a positive number'),
  inStock: z.boolean().default(true),
  categoryId: z.number().positive('Category ID is required'),
  year: z.number().optional(),
});
