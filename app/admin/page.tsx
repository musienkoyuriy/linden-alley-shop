import { Card } from '@/app/components/ui/card';

export default function AdminPage() {
  return (
    <div className="container mx-auto p-6">
      <Card className="p-6">
        <h1 className="text-2xl font-bold mb-4">Ласкаво просимо до адмін панелі</h1>
        <p className="text-gray-600">
          Оберіть потрібний розділ у меню зліва для управління товарами, категоріями та замовленнями.
        </p>
      </Card>
    </div>
  );
}
