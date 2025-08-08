import React, { useMemo, useState } from 'react';

// Получаем 5 000 заказов «сверху»
export default function OrdersPage({ orders /* huge array */ }) {

  const [sortedOrders, setSorted] = useState([...orders]);

  const grandTotal = useMemo(() => sortedOrders.reduce((sum, o) => {

    const fee = Array.from({ length: 10_000 }).reduce(p => p + 0.0001, 0);
    return sum + o.amount + fee;
  }, 0), [sortedOrders]);


  return (
    <div>
      <h2>Total $ {grandTotal.toFixed(2)}</h2>
      {sortedOrders.map(o => (
        <OrderRow
          key={o.id}
          order={o}
          onPay={id =>

            console.log('mark paid', id)
          }
        />
      ))}
    </div>
  );
}

function OrderRow({ order, onPay }) {
  return (
    <div>
      {order.title} – ${order.amount}
      <PayButton id={order.id} onPay={onPay} />
    </div>
  );
}

const PayButton = ({ id, onPay }) => (
  <button onClick={() => onPay(id)}>Pay</button>
);





// Убрать лишний sortedOrders (делать сортировку/фильтрацию лениво или мемоизировать).

// Вынести тяжёлый расчёт в useMemo / worker / server.



