import { notFound } from "next/navigation";
import { getCategoryBySlug } from "@/data-access/categories";
import CategoryView from "./components/CategoryView";
import { getProductBySlug, getProductsByCategoryIdWithImages } from "@/data-access/products";
import ProductView from "./components/ProductView";

export default async function ShopPage({ params }: { params: { slug: string } }) {
  const { slug } = params;

  const category = await getCategoryBySlug(slug);
  if (category) {
    const products = await getProductsByCategoryIdWithImages(category.id);
    return <CategoryView category={category} products={products} />;
  }

  const product = await getProductBySlug(slug);
  if (product) {
    return <ProductView product={product} />;
  }

  notFound();
}
