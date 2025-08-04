export const metadata = {
  title: "Про нас",
  description: "Дізнайтеся більше про Linden Alley Shop",
};

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <h1 className="text-2xl font-bold mb-6">Про нас</h1>
      <section className="mb-8">
        <p className="text-gray-700 mb-4">
          <span className="font-semibold">Linden Alley Shop</span> — це сучасний магазин одягу та аксесуарів, створений для тих, хто цінує якість, стиль та індивідуальність. Ми прагнемо надати нашим клієнтам найкращий вибір товарів, які відповідають останнім тенденціям моди та підкреслюють унікальність кожного.
        </p>
        <p className="text-gray-700 mb-4">
          Наша команда ретельно відбирає кожну позицію, щоб ви могли бути впевнені у якості та актуальності асортименту. Ми співпрацюємо лише з перевіреними постачальниками та брендами.
        </p>
      </section>
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Наші цінності</h2>
        <ul className="list-disc pl-6 text-gray-700 space-y-2">
          <li>Якість та надійність продукції</li>
          <li>Індивідуальний підхід до кожного клієнта</li>
          <li>Сучасний асортимент та постійне оновлення колекцій</li>
          <li>Відкритість та прозорість у роботі</li>
        </ul>
      </section>
      <section>
        <h2 className="text-xl font-semibold mb-2">Зв'яжіться з нами</h2>
        <p className="text-gray-700">
          Якщо у вас виникли питання або пропозиції, будь ласка, звертайтеся до нас за телефоном або електронною поштою, вказаними у розділі <a href="/contacts" className="text-blue-600 hover:underline">Контакти</a>. Ми завжди раді допомогти!
        </p>
      </section>
    </div>
  );
}
