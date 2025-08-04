import { createUser, getUserByEmail, getUserByPhone, User } from "@/data-access/users";
import { hashPassword } from "@/lib/auth";

// todo: move somewhere else
export type ActionResponse<T> = {
  success: boolean;
  data?: T;
  message?: string;
}

// TODO: convert to DTO
export async function createUserUseCase(email: string, password: string, firstName: string, lastName: string, phone: string): Promise<ActionResponse<User | null>> {
  const hashedPassword = await hashPassword(password);

  try {
    const userByEmail = await getUserByEmail(email);

    if (userByEmail) {
      return {
        success: false,
        message: 'Користувач з таким email вже існує'
      };
    }

    const userByPhone = await getUserByPhone(phone);

    if (userByPhone) {
      return {
        success: false,
        message: 'Користувач з таким номером телефону вже існує'
      };
    }

    const [user] = await createUser({
      firstName,
      lastName,
      phone,
      email,
      password: hashedPassword,
      role: 'user',
    });

    return { success: true, data: user, message: 'Користувача створено!' };
  } catch (error) {
    console.error('Error creating user:', error)
    return { success: false, message: 'Не вдалося створити користувача' };
  }
}
