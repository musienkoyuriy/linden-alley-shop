import { db } from '@/db';
import { productImages, products } from '@/db/schema';
import { eq, InferSelectModel } from 'drizzle-orm';

export type Product = InferSelectModel<typeof products>;
export type ProductWithImages = Product & { images: string[] };

// Reusable product selection fields
const productSelectFields = {
  id: products.id,
  title: products.title,
  price: products.price,
  description: products.description,
  inStock: products.inStock,
  categoryId: products.categoryId,
  year: products.year,
  slug: products.slug,
  createdAt: products.createdAt,
} as const;

// Helper function to fetch product images
const getProductImages = async (productId: number): Promise<string[]> => {
  const images = await db
    .select({ url: productImages.url })
    .from(productImages)
    .where(eq(productImages.productId, productId));

  return images.map(img => img.url);
};

// Helper function to add images to a product
const addImagesToProduct = async (product: Product): Promise<ProductWithImages> => {
  const images = await getProductImages(product.id);
  return { ...product, images };
};

export const getProducts = async (): Promise<ProductWithImages[]> => {
  const allProducts = await db
    .select(productSelectFields)
    .from(products);

  return Promise.all(allProducts.map(addImagesToProduct));
};

export const getProductById = async (id: number): Promise<ProductWithImages | null> => {
  const rows = await db
    .select(productSelectFields)
    .from(products)
    .where(eq(products.id, id));

  if (rows.length === 0) {
    return null;
  }

  return await addImagesToProduct(rows[0]);
};

export const getProductsByCategoryId = async (categoryId: number): Promise<Product[]> => {
  return await db
    .select(productSelectFields)
    .from(products)
    .where(eq(products.categoryId, categoryId));
};

export const getProductsByCategoryIdWithImages = async (categoryId: number): Promise<ProductWithImages[]> => {
  const categoryProducts = await db
    .select(productSelectFields)
    .from(products)
    .where(eq(products.categoryId, categoryId));

  return Promise.all(categoryProducts.map(addImagesToProduct));
};

export const getProductBySlug = async (slug: string): Promise<ProductWithImages | null> => {
  const rows = await db
    .select(productSelectFields)
    .from(products)
    .where(eq(products.slug, slug));

  if (rows.length === 0) {
    return null;
  }

  return await addImagesToProduct(rows[0]);
};
