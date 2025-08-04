export const metadata = {
  title: "Доставка і оплата",
  description: "Інформація про доставку та оплату в Linden Alley Shop",
};

export default function DeliveryPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <h1 className="text-2xl font-bold mb-6">Доставка і оплата</h1>
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Доставка</h2>
        <ul className="list-disc pl-6 text-gray-700 space-y-2">
          <li>
            <span className="font-medium">Безкоштовна доставка</span> при замовленні від 1000 грн.
          </li>
          <li>
            Доставка здійснюється по всій Україні через <span className="font-medium">Нову Пошту</span>.
          </li>
          <li>
            Термін доставки: <span className="font-medium">1-3 робочих дні</span> після підтвердження замовлення.
          </li>
          <li>
            Вартість доставки для замовлень до 1000 грн — згідно з тарифами перевізника.
          </li>
        </ul>
      </section>
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Оплата</h2>
        <ul className="list-disc pl-6 text-gray-700 space-y-2">
          <li>
            <span className="font-medium">Оплата при отриманні</span> (накладений платіж).
          </li>
          <li>
            <span className="font-medium">Онлайн-оплата</span> банківською картою через платіжну систему.
          </li>
        </ul>
      </section>
      <section>
        <h2 className="text-xl font-semibold mb-2">Додаткова інформація</h2>
        <p className="text-gray-700">
          Після оформлення замовлення наш менеджер зв'яжеться з вами для підтвердження деталей. Якщо у вас виникли питання, будь ласка, звертайтеся до нас за телефоном або електронною поштою, вказаними у розділі <a href="/contacts" className="text-blue-600 hover:underline">Контакти</a>.
        </p>
      </section>
    </div>
  );
}
