'use server';

import { deleteSession } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function signOut() {
  try {
    deleteSession();
  } catch (error) {
    console.error('sign out error', error);
  } finally {
    revalidatePath('/', 'layout');
    redirect('/shop');
  }
}