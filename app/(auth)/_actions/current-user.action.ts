'use server';

import { getUserById } from "@/data-access/users";
import { getSession } from "@/lib/auth";

async function getCachedCurrentUser(userId: string) {
  'use cache';

  return await getUserById(userId);
}

export async function getCurrentUser() {
  const session = await getSession();

  if (!session) return null;

  return await getCachedCurrentUser(session.userId);
}