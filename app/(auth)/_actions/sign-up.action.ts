"use server";

import { z } from "zod";
import { createSession } from "@/lib/auth";
import { SignUpSchema } from "../schemas";
import { createUserUseCase } from "@/use-cases/users";

export async function signUpAction(userData: z.infer<typeof SignUpSchema>) {
  const validationResult = SignUpSchema.safeParse(userData);

  if (!validationResult.success) {
    return { success: false, message: validationResult.error.issues[0].message }
  }

  const { email, password, firstName, lastName, phone } = validationResult.data;

  const userResponse = await createUserUseCase(email, password, firstName, lastName, phone)

  if (!userResponse.success) {
    return { success: false, message: userResponse.message };
  }

  const user = userResponse.data;

  await createSession(user!.id);

  return { success: true, message: 'Користувача створено!' };
}
