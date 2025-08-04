import { getCategories } from '@/data-access/categories';
import { getProductById } from '@/data-access/products';
import { ProductForm } from '../../new/product-form';

export default async function UpdateProductPage({ params }: { params: { id: string } }) {
  const categories = await getCategories();
  const product = await getProductById(Number(params.id));

  return (
    <div className="container mx-auto px-4 py-8">
      <ProductForm categories={categories} product={product} />
    </div>
  );
}
