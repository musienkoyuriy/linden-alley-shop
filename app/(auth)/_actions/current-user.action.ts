'use server';

import { getUserById } from "@/data-access/users";
import { getSession } from "@/lib/auth";
import { UserDto } from "@/use-cases/users/types";

async function getCachedCurrentUser(userId: string): Promise<UserDto | null> {
  'use cache';

  return await getUserById(userId);
}

export async function getCurrentUser(): Promise<UserDto | null> {
  const session = await getSession();

  if (!session) return null;

  return await getCachedCurrentUser(session.userId);
}
