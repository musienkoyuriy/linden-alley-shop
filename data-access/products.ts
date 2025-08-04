import { db } from '@/db';
import { productImages, products } from '@/db/schema';
import { eq } from 'drizzle-orm';

export const getProducts = async () => {
  return await db
    .select({
      id: products.id,
      title: products.title,
      price: products.price,
      inStock: products.inStock,
      categoryId: products.categoryId,
      year: products.year,
      createdAt: products.createdAt
    })
    .from(products);
}

export const getProductById = async (id: number) => {
  const rows = await db
    .select({
      id: products.id,
      title: products.title,
      price: products.price,
      inStock: products.inStock,
      categoryId: products.categoryId,
      year: products.year,
    })
    .from(products)
    .where(eq(products.id, id));

  if (rows.length === 0) {
    return null;
  }

  const images = await db
    .select({ url: productImages.url })
    .from(productImages)
    .where(eq(productImages.productId, id));

  return {
    ...rows[0],
    images: images.map(img => img.url)
  };
}
