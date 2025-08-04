import { getCategories } from '@/data-access/categories';
import { ProductForm } from './product-form';

export default async function NewProductPage() {
  const categories = await getCategories();

  return (
    <div className="container mx-auto px-4 py-8">
      <ProductForm categories={categories} />
    </div>
  );
} 