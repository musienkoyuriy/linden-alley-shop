'use client';

import useEmblaCarousel from 'embla-carousel-react';
import { ProductWithImages } from '@/data-access/products';
import { ProductCard } from './ProductCard';
import { Button } from './button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useCallback } from 'react';

interface ProductCarouselProps {
  products: ProductWithImages[];
}

export function ProductCarousel({ products }: ProductCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'start',
    slidesToScroll: 1,
    containScroll: 'trimSnaps',
    breakpoints: {
      '(min-width: 768px)': { slidesToScroll: 2 },
      '(min-width: 1024px)': { slidesToScroll: 3 },
    },
  });

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  return (
    <div className="relative flex gap-4">
      <Button
        variant="outline"
        size="icon"
        className="flex-shrink-0 bg-white/80 hover:bg-white shadow-md z-10 self-start mt-[calc(50vw+3rem)] md:mt-[calc(25vw+3rem)] lg:mt-[calc(16.67vw+3rem)]"
        onClick={scrollPrev}
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>

      <div className="flex-1 overflow-hidden py-6 px-4" ref={emblaRef}>
        <div className="flex gap-6">
          {products.map((product) => (
            <div key={product.id} className="flex-[0_0_100%] min-w-0 md:flex-[0_0_50%] lg:flex-[0_0_33.33%] px-3">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>

      <Button
        variant="outline"
        size="icon"
        className="flex-shrink-0 bg-white/80 hover:bg-white shadow-md z-10 self-start mt-[calc(50vw+3rem)] md:mt-[calc(25vw+3rem)] lg:mt-[calc(16.67vw+3rem)]"
        onClick={scrollNext}
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
}
