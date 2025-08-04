import Link from 'next/link';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen">
      <aside className="w-64 bg-gray-100 p-6 space-y-4">
        <h2 className="text-xl font-bold mb-6">Адмін панель</h2>
        <nav className="space-y-2">
          <Link
            href="/admin/products"
            className="block p-2 hover:bg-gray-200 rounded transition-colors"
          >
            Товари
          </Link>
          <Link
            href="/admin/categories"
            className="block p-2 hover:bg-gray-200 rounded transition-colors"
          >
            Категорії
          </Link>
          <Link
            href="/admin/orders"
            className="block p-2 hover:bg-gray-200 rounded transition-colors"
          >
            Замовлення
          </Link>
        </nav>
      </aside>

      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  );
}
