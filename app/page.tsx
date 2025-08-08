import { getCategories } from "@/data-access/categories";
import { Card, CardHeader, CardTitle, CardDescription } from "@/app/components/ui/card";
import Link from "next/link";
import { Metadata } from "next";
import { getProducts } from "@/data-access/products";
import { ProductCarousel } from "@/app/components/ui/ProductCarousel";

export const metadata: Metadata = {
  title: "Linden Alley Shop",
  description: "Монети",
};

export default async function Home() {
  const categories = await getCategories();
  const products = await getProducts();

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="mb-12">
          <h1 className="text-3xl font-bold text-center mb-8">КАТЕГОРІЇ МАГАЗИНУ</h1>

          <div className="flex justify-center">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl">
              {categories.map((category) => (
                <Link href={`/shop/${category.slug}` as any} key={category.id}>
                  <Card className="hover:shadow-lg transition-shadow cursor-pointer h-48 w-full aspect-square flex flex-col justify-center">
                    <CardHeader className="text-center">
                      <CardTitle className="text-lg">{category.name}</CardTitle>
                      {category.description && (
                        <CardDescription>{category.description}</CardDescription>
                      )}
                    </CardHeader>
                  </Card>
                </Link>
              ))}
            </div>
          </div>

          <h1 className="text-3xl font-bold text-center mb-8 mt-12">КАТАЛОГ ТОВАРІВ</h1>

          <div className="max-w-6xl mx-auto">
            <ProductCarousel products={products} />
          </div>
        </div>
      </main>

      <footer className="bg-white shadow-md mt-auto">
        <div className="container mx-auto px-4 py-6 flex justify-center">
          <p className="text-gray-600">© 2024 Linden Alley Shop. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
