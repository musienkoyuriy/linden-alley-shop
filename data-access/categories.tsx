import { db } from "@/db";
import { categories } from "@/db/schema";

export const getCategories = async () => {
  return await db.select().from(categories);
}
