import Link from 'next/link';
import { Button } from '@/app/components/ui/button';
import { Card } from '@/app/components/ui/card';
import { getProducts } from '@/data-access/products';

export const metadata = {
  title: 'Products - Admin Panel',
  description: 'Manage products in the admin panel',
};

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Товари</h1>
        <Link href="/admin/products/new">
          <Button>Створити новий товар</Button>
        </Link>
      </div>

      <Card className="p-6">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left p-2">Назва</th>
                <th className="text-left p-2">Ціна</th>
                <th className="text-left p-2">В наявності</th>
                <th className="text-left p-2">Рік</th>
                <th className="text-left p-2">ID категорії</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id} className="border-b">
                  <td className="p-2">{product.title}</td>
                  <td className="p-2">${(product.price / 100).toFixed(2)}</td>
                  <td className="p-2">{product.inStock ? 'Так' : 'Ні'}</td>
                  <td className="p-2">{product.year}</td>
                  <td className="p-2">{product.categoryId}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}