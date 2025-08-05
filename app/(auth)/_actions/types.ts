// Shared types for server action responses
export type ActionResponse<T = unknown> = {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}