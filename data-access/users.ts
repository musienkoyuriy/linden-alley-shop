import { db } from "@/db"
import { users } from "@/db/schema"
import { UserDto } from "@/use-cases/users/types";
import { eq, InferInsertModel, InferSelectModel } from 'drizzle-orm';

export type User = InferSelectModel<typeof users>;
export type NewUser = InferInsertModel<typeof users>;

const toUserDto = (user: User): UserDto => {
  return {
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    phone: user.phone,
    email: user.email,
    role: user.role,
  }
}

export const createUser = async (user: Omit<NewUser, 'id' | 'createdAt'>): Promise<UserDto[]> => {
  const usersResult = await db
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

  return usersResult.map(toUserDto);
}

export const getUserById = async (userId: string): Promise<UserDto> => {
  const usersResult = await db
    .select()
    .from(users)
    .where(eq(users.id, userId));

  return toUserDto(usersResult[0] || null);
}

export const getUserByEmail = async (email: string): Promise<UserDto | null> => {
  const user = await db.query.users.findFirst({
    where: eq(users.email, email)
  })

  return user ? toUserDto(user) : null;
}

export const getUserByPhone = async (phone: string): Promise<UserDto | null> => {
  const user = await db.query.users.findFirst({
    where: eq(users.phone, phone)
  })

  return user ? toUserDto(user) : null;
}
