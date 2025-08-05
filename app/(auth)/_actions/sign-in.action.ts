'use server';

import { createSession, verifyPassword } from "@/lib/auth";
import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";

interface SignInCredentials {
  email: string;
  password: string;
}

export async function signInAction({ email, password }: SignInCredentials) {
  try {
    const existingUser = await db.query.users.findFirst({
      where: eq(users.email, email),
    });

    if (!existingUser) {
      return {
        error: "Invalid credentials",
        success: false,
      };
    }

    const isPasswordValid = await verifyPassword(password, existingUser.password);
    if (!isPasswordValid) {
      return {
        error: "Invalid credentials",
        success: false,
      };
    }

    const sessionCreated = await createSession(existingUser.id, existingUser.role);
    if (!sessionCreated) {
      return {
        error: "Failed to create session",
        success: false,
      };
    }

    return { success: true };
  } catch (error) {
    console.error("Error during sign in:", error);
    return {
      error: "Something went wrong",
      success: false,
    };
  }
}