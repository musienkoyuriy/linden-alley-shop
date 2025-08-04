export const metadata = {
  title: "Контакти",
  description: "Зв'яжіться з Linden Alley Shop",
};

export default function ContactsPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <h1 className="text-2xl font-bold mb-6">Контакти</h1>
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Як з нами зв'язатися</h2>
        <ul className="space-y-2 text-gray-700">
          <li>
            <span className="font-medium">Телефон:</span>{" "}
            <a href="tel:+380XXXXXXXXX" className="text-blue-600 hover:underline">
              +380 XX XXX XX XX
            </a>
          </li>
          <li>
            <span className="font-medium">Email:</span>{" "}
            <a href="mailto:info@lindenalley.com" className="text-blue-600 hover:underline">
              info@lindenalley.com
            </a>
          </li>
          <li>
            <span className="font-medium">Адреса:</span> м. Київ, вул. Хрещатик, 1
          </li>
        </ul>
      </section>
      <section>
        <h2 className="text-xl font-semibold mb-2">Графік роботи</h2>
        <ul className="text-gray-700">
          <li>Понеділок - П'ятниця: 10:00 - 19:00</li>
          <li>Субота: 11:00 - 17:00</li>
          <li>Неділя: вихідний</li>
        </ul>
      </section>
      <section className="mt-8">
        <h2 className="text-xl font-semibold mb-2">Ми у соціальних мережах</h2>
        <div className="flex gap-4">
          <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors" aria-label="Facebook">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" /></svg>
          </a>
          <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors" aria-label="Instagram">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2zm0 1.5A4.25 4.25 0 0 0 3.5 7.75v8.5A4.25 4.25 0 0 0 7.75 20.5h8.5A4.25 4.25 0 0 0 20.5 16.25v-8.5A4.25 4.25 0 0 0 16.25 3.5h-8.5zm4.25 3.25a5.25 5.25 0 1 1 0 10.5 5.25 5.25 0 0 1 0-10.5zm0 1.5a3.75 3.75 0 1 0 0 7.5 3.75 3.75 0 0 0 0-7.5zm5.25.75a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" /></svg>
          </a>
        </div>
      </section>
    </div>
  );
}
