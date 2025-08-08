import { db } from "@/db";
import { categories } from "@/db/schema";
import { eq, InferSelectModel } from "drizzle-orm";

type Category = InferSelectModel<typeof categories>;

// todo: move to the other layer
export type CategoryDto = {
  id: number;
  name: string;
  slug: string;
  description: string;
}

const toCategoryDto = (category: Category): CategoryDto => {
  return {
    id: category.id,
    name: category.name,
    slug: category.slug,
    description: category.description ?? '',
  }
}

export const getCategories = async (): Promise<CategoryDto[]> => {
  const categoriesResult = await db.select().from(categories);

  return categoriesResult.map(toCategoryDto);
}

export const getCategoryBySlug = async (slug: string): Promise<CategoryDto | null> => {
  const category = await db.query.categories.findFirst({
    where: eq(categories.slug, slug),
  });

  return category ? toCategoryDto(category) : null;
}
