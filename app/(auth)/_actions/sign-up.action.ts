'use server';

import { z } from "zod";
import { createSession } from "@/lib/auth";
import { SignUpSchema } from "../schemas";
import { UserAlreadyExistsError } from "@/use-cases/users/exceptions";
import { createUserUseCase } from "@/use-cases/users/create-user.use-case";

export async function signUpAction(userData: z.infer<typeof SignUpSchema>) {
  const validationResult = SignUpSchema.safeParse(userData);

  if (!validationResult.success) {
    return {
      success: false,
      message: validationResult.error.issues[0].message
    };
  }

  const { email, password, firstName, lastName, phone } = validationResult.data;

  try {
    const user = await createUserUseCase({ email, password, firstName, lastName, phone });
    await createSession(user.id, user.role);

    return { success: true, message: 'Користувача створено!' };
  } catch (error) {
    if (error instanceof UserAlreadyExistsError) {
      return {
        success: false,
        message: error.message.includes('email')
          ? 'Користувач з таким email вже існує'
          : 'Користувач з таким номером телефону вже існує'
      };
    }

    console.error('Error creating user:', error);
    return { success: false, message: 'Не вдалося створити користувача' };
  }
}
