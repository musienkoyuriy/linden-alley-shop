import { Card } from '@/app/components/ui/card';
import { getCategories } from '@/data-access/categories';
import { cn } from '@/lib/utils';

export default async function CategoriesPage() {
  const categories = await getCategories();

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Категорії</h1>
      </div>

      <Card className="p-6">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left p-2">Назва</th>
                <th className="text-left p-2">Опис</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((category) => (
                <tr key={category.id} className="border-b">
                  <td className="p-2">{category.name}</td>
                  <td className={cn(
                    'p-2',
                    !category.description && 'text-muted-foreground'
                  )} >{category.description || 'Немає опису'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
} 