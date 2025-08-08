'use client';

import { useState } from 'react';
import { Card } from './card';
import Image from 'next/image';
import { Button } from './button';
import { ProductWithImages } from '@/data-access/products';

interface ProductCardProps {
  product: ProductWithImages;
  onBuyClick?: () => void;
}

export function ProductCard({ product, onBuyClick }: ProductCardProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const defaultImage = '/placeholder-image.jpg';

  return (
    <Card className="group transition-all duration-300 hover:scale-[1.02] hover:border hover:border-gray-200 hover:shadow-lg cursor-pointer border-transparent">
      <div className="flex flex-col">
        <div className="relative aspect-square">
          <Image
            src={product.images[selectedImageIndex] || defaultImage}
            alt={product.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>

        <div className="p-4">
          <h3 className="text-base font-medium mb-2 line-clamp-2">{product.title}</h3>
          <p className="font-bold text-xl mb-3">{product.price} ₴</p>

          <div className="h-12">
            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="flex gap-2 justify-center">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={(e) => {
                      e.preventDefault();
                      setSelectedImageIndex(index);
                    }}
                    className={`relative w-10 h-10 rounded-md overflow-hidden border-2 transition-all
                      ${selectedImageIndex === index ? 'border-primary' : 'border-transparent hover:border-primary/50'}`}
                  >
                    <Image
                      src={image}
                      alt={`${product.title} view ${index + 1}`}
                      fill
                      className="object-cover"
                      sizes="40px"
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="h-12">
            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 mt-8">
              <Button
                onClick={(e) => {
                  e.preventDefault();
                  onBuyClick?.();
                }}
                className="w-full"
              >
                КУПИТИ
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
