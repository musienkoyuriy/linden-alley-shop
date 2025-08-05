export type UserDto = {
  id: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  role: 'user' | 'admin';
}

export type CreateUserInput = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone: string;
}