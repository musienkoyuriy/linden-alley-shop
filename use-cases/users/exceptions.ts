export class UserAlreadyExistsError extends Error {
  constructor(field: 'email' | 'phone', value: string) {
    super(`User with ${field} '${value}' already exists`);
    this.name = 'UserAlreadyExistsError';
  }
}

export class UserNotFoundError extends Error {
  constructor(identifier: string) {
    super(`User not found: ${identifier}`);
    this.name = 'UserNotFoundError';
  }
}

export class InvalidCredentialsError extends Error {
  constructor() {
    super('Invalid credentials provided');
    this.name = 'InvalidCredentialsError';
  }
}
