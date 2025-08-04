'use client';

import { useForm } from 'react-hook-form';
import { type InferSelectModel } from 'drizzle-orm';
import { categories } from '../../../../db/schema';
import { useState, useCallback, useEffect } from 'react';
import { CldUploadWidget } from 'next-cloudinary';
import Image from 'next/image';
import { zodResolver } from '@hookform/resolvers/zod';
import z from 'zod';
import { Toaster, toast } from 'sonner';

import { Button } from "../../../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../../../components/ui/form";
import { Input } from "../../../components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../components/ui/select";
import { createProduct } from '../actions';

type Category = InferSelectModel<typeof categories>;

interface ProductFormProps {
  categories: Category[];
}

interface UploadResult {
  info: {
    secure_url: string;
  };
}

const NewProductSchema = z.object({
  title: z.string().min(1, { message: 'Назва є обов\'язковою' }),
  price: z.number().min(1, { message: 'Ціна є обов\'язковою' }),
  category: z.number().min(1, { message: 'Категорія є обов\'язковою' }),
  images: z.array(z.string()).min(1, { message: 'Зображення є обов\'язковим' }),
  year: z.number().min(2018, { message: 'Рік є обов\'язковим' }),
})

type FormFields = z.infer<typeof NewProductSchema>;

export function ProductForm({ categories }: ProductFormProps) {
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [isDragging, setIsDragging] = useState(false);

  const form = useForm<FormFields>({
    defaultValues: {
      title: '',
      price: 1500,
      category: 0,
      images: [],
      year: 2025,
    },
    resolver: zodResolver(NewProductSchema),
  });

  useEffect(() => {
    form.setValue('images', imageUrls);
  }, [imageUrls, form]);

  const onSubmit = async (data: FormFields) => {
    const createProductPromise = createProduct({
      title: data.title,
      price: data.price,
      categoryId: data.category,
      images: imageUrls,
      year: data.year,
      inStock: true,
    });

    toast.promise(createProductPromise, {
      loading: 'Створення товару...',
      success: 'Товар успішно створено!',
      error: 'Сталася неочікувана помилка. Будь ласка, спробуйте ще раз.',
    });

    try {
      await createProductPromise;
      form.reset();
      setImageUrls([]);
    } catch (error) {
      console.error('Error creating product:', error);
    }
  };

  const handleUploadSuccess = useCallback((result: UploadResult) => {
    const secureUrl = result.info.secure_url;
    setImageUrls(prev => [...prev, secureUrl]);
  }, []);

  const handleRemoveImage = (urlToRemove: string) => {
    setImageUrls(imageUrls.filter(url => url !== urlToRemove));
  };

  return (
    <>
      <Toaster position="top-right" />
      <div className="min-h-screen py-8 flex items-start justify-center">
        <Card className="max-w-2xl w-full">
          <CardHeader>
            <CardTitle>Створити новий товар</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Назва</FormLabel>
                      <FormControl>
                        <Input placeholder="Назва товару" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Ціна</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Ціна в центах"
                          min="0"
                          step="1"
                          value={field.value}
                          onChange={(e) => field.onChange(e.target.valueAsNumber || 0)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Категорія</FormLabel>
                      <Select
                        onValueChange={(value) => field.onChange(Number(value))}
                        value={field.value ? field.value.toString() : undefined}
                        defaultValue={field.value?.toString()}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Оберіть категорію" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {categories.map((category) => (
                            <SelectItem key={category.id} value={category.id.toString()}>
                              {category.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="images"
                  render={() => (
                    <FormItem className="space-y-4">
                      <FormLabel>Зображення</FormLabel>
                      <FormControl>
                        <div className="space-y-4">
                          <CldUploadWidget
                            uploadPreset="linden-alley-shop"
                            onSuccess={(result) => handleUploadSuccess(result as UploadResult)}
                            options={{
                              maxFiles: 5,
                              sources: ['local'],
                              clientAllowedFormats: ['jpg', 'jpeg', 'png', 'webp'],
                              maxFileSize: 10_000_000,
                              showUploadMoreButton: true,
                              singleUploadAutoClose: false,
                              styles: {
                                palette: {
                                  window: "#FFFFFF",
                                  windowBorder: "#90A0B3",
                                  tabIcon: "#0078FF",
                                  menuIcons: "#5A616A",
                                  textDark: "#000000",
                                  textLight: "#FFFFFF",
                                  link: "#0078FF",
                                  action: "#FF620C",
                                  inactiveTabIcon: "#0E2F5A",
                                  error: "#F44235",
                                  inProgress: "#0078FF",
                                  complete: "#20B832",
                                  sourceBg: "#E4EBF1"
                                }
                              },
                              text: {
                                en: {
                                  upload: 'Завантажити',
                                  'drag_and_drop': 'Перетягніть файли сюди',
                                  'drag_and_drop_click': 'або натисніть для вибору',
                                  'browse': 'вибрати',
                                  'or': 'або',
                                  'max_file_size': 'Максимальний розмір файлу: 10MB',
                                  'formats_supported': 'Підтримувані формати: JPG, PNG, WebP'
                                }
                              }
                            }}
                          >
                            {({ open }) => (
                              <div
                                className={`relative z-10 border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors
                                          ${isDragging ? 'border-primary bg-primary/5' : 'border-muted-foreground/25 hover:border-muted-foreground'}
                                        `}
                                onDragOver={(e) => {
                                  e.preventDefault();
                                  e.stopPropagation();
                                  setIsDragging(true);
                                }}
                                onDragLeave={(e) => {
                                  e.preventDefault();
                                  e.stopPropagation();
                                  setIsDragging(false);
                                }}
                                onDrop={(e) => {
                                  e.preventDefault();
                                  e.stopPropagation();
                                  setIsDragging(false);
                                  open();
                                }}
                                onClick={() => open()}
                              >
                                <div className="space-y-2">
                                  <div className="text-muted-foreground">
                                    Перетягніть зображення сюди або натисніть для вибору
                                  </div>
                                  <div className="text-sm text-muted-foreground">
                                    Підтримувані формати: JPG, PNG, WebP
                                  </div>
                                </div>
                              </div>
                            )}
                          </CldUploadWidget>

                          {imageUrls.length > 0 && (
                            <div className="space-y-2">
                              <p className="text-sm font-medium">Додані зображення:</p>
                              <div className="grid grid-cols-2 gap-4">
                                {imageUrls.map((url, index) => (
                                  <div key={index} className="relative group">
                                    <Image
                                      src={url}
                                      alt={`Зображення товару ${index + 1}`}
                                      width={400}
                                      height={300}
                                      className="w-full h-40 object-cover rounded-lg"
                                    />
                                    <Button
                                      type="button"
                                      variant="destructive"
                                      size="icon"
                                      onClick={() => handleRemoveImage(url)}
                                      className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                                    >
                                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                      </svg>
                                    </Button>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="year"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Рік</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Рік товару"
                          min={2018}
                          max={new Date().getFullYear()}
                          value={field.value}
                          onChange={(e) => field.onChange(e.target.valueAsNumber || 0)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  disabled={form.formState.isSubmitting}
                  className="w-full"
                >
                  {form.formState.isSubmitting ? 'Створення...' : 'Створити товар'}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </>
  );
} 