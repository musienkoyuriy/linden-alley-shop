import { db } from "@/db";
import { orders } from "@/db/schema";

export const getOrders = async () => {
  return await db
    .select()
    .from(orders);
}
