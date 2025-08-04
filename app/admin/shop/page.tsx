import React from "react";

export default function AdminShopPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Магазин (Адмін-панель)</h1>
      <div className="bg-white rounded shadow p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Товари</h2>
          <button className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition-colors">
            Додати товар
          </button>
        </div>
        <div className="border rounded p-4 text-gray-500 text-center">
          {/* Тут буде таблиця з товарами */}
          <p>Тут поки що немає товарів.</p>
        </div>
      </div>
    </div>
  );
}