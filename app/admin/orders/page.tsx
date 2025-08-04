import { Card } from '@/app/components/ui/card';
import { getOrders } from '@/data-access/orders';

export default async function OrdersPage() {
  const orders = await getOrders();

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Замовлення</h1>
      </div>

      <Card className="p-6">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left p-2">ID</th>
                <th className="text-left p-2">Клієнт</th>
                <th className="text-left p-2">Сума</th>
                <th className="text-left p-2">Статус</th>
                <th className="text-left p-2">Тип доставки</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id} className="border-b">
                  <td className="p-2">{order.id}</td>
                  <td className="p-2">{order.customerName}</td>
                  <td className="p-2">${(order.total / 100).toFixed(2)}</td>
                  <td className="p-2">{order.status}</td>
                  <td className="p-2">{order.deliveryType}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
