import { createUser, getUserByEmail, getUserByPhone } from "@/data-access/users";
import { hashPassword } from "@/lib/auth";
import { UserAlreadyExistsError } from "./exceptions";
import { UserDto, CreateUserInput } from "./types";

export async function createUserUseCase(
  input: CreateUserInput
): Promise<UserDto> {
  const { email, password, firstName, lastName, phone } = input;
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
