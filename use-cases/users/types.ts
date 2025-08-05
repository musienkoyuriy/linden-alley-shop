export type UserDto = {
  id: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  role: string;
}

export type CreateUserInput = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone: string;
}