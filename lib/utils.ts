import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import slugify from 'slugify';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function generateSlug(title: string): string {
  const cleaned = title
    .replace(/№/g, 'number')
    .replace(/₴/g, 'uah');

  return slugify(cleaned, {
    replacement: '-',
    lower: true,
    strict: false,
    locale: 'uk',
    trim: true
  });
}
