import { db } from "@/db"
import { users } from "@/db/schema"
import { eq, InferInsertModel, InferSelectModel } from 'drizzle-orm';

export type User = InferSelectModel<typeof users>;
export type NewUser = InferInsertModel<typeof users>;

export const createUser = async (user: Omit<NewUser, 'id' | 'createdAt'>): Promise<User[]> => {
  return await db
    .insert(users)
    .values({
      firstName: user.firstName,
      lastName: user.lastName,
      phone: user.phone,
      email: user.email,
      password: user.password,
      role: user.role,
    })
    .returning();
}

export const getUserById = async (userId: string): Promise<User> => {
  const usersResult = await db
    .select()
    .from(users)
    .where(eq(users.id, userId));

  return usersResult[0] || null
}

export const getUserByEmail = async (email: string): Promise<User | undefined> => {
  return await db.query.users.findFirst({
    where: eq(users.email, email)
  })
}

export const getUserByPhone = async (phone: string): Promise<User | undefined> => {
  return await db.query.users.findFirst({
    where: eq(users.phone, phone)
  })
}
