'use client';

import { CategoryDto } from "@/data-access/categories";
import { ProductWithImages } from "@/data-access/products";
import { ProductCard } from "@/app/components/ui/ProductCard";

const categoryNames = {
  'souvenir': 'сувеніри',
  'album': 'альбоми',
  'booklet': 'буклети'
};

export default function CategoryView({ category, products }: { category: CategoryDto, products: ProductWithImages[] }) {
  return (
    <div className="container mx-auto px-6 md:px-8 lg:px-12 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">{category.name}</h1>

      {products.length === 0 ? (
        <div className="text-center py-12">
          <div className="max-w-md mx-auto">
            <div className="text-gray-400 mb-4">
              <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-500 mt-6">Нажаль {categoryNames[category.slug as keyof typeof categoryNames]} зараз відсутні :(</h3>

          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onBuyClick={() => {
                // TODO: Implement buy functionality
                console.log('Buy clicked for product:', product.title);
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
