import React from "react";

export default function ShopPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Наші товари</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {/* Products will be added here */}
        <div className="text-center text-gray-500">
          <p>Товари з'являться найближчим часом.</p>
        </div>
      </div>
    </div>
  );
}
