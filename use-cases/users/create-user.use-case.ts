import { createUser, getUserByEmail, getUserByPhone } from "@/data-access/users";
import { hashPassword } from "@/lib/auth";
import { UserAlreadyExistsError } from "./exceptions";
import { UserDto } from "./types";

// Create a new user account
export async function createUserUseCase(
  email: string, 
  password: string, 
  firstName: string, 
  lastName: string, 
  phone: string
): Promise<UserDto> {
  const hashedPassword = await hashPassword(password);

  const userByEmail = await getUserByEmail(email);
  if (userByEmail) {
    throw new UserAlreadyExistsError('email', email);
  }

  const userByPhone = await getUserByPhone(phone);
  if (userByPhone) {
    throw new UserAlreadyExistsError('phone', phone);
  }

  const [user] = await createUser({
    firstName,
    lastName,
    phone,
    email,
    password: hashedPassword,
    role: 'user',
  });

  return user;
}
