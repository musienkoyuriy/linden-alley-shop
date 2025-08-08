import { db } from "@/db";
import { productImages, products } from "@/db/schema";
import { InferInsertModel } from "drizzle-orm";

export type NewProduct = Omit<InferInsertModel<typeof products>, 'id'> & { images: string[] };

export const createProduct = async (productData: NewProduct) => {
  const { images, ...restProductData } = productData;

  const [newProduct] = await db.insert(products)
    .values(restProductData)
    .returning();

  await db.insert(productImages)
    .values(
      images.map(url => ({
        productId: newProduct.id,
        url
      }))
    );
}
