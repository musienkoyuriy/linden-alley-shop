import { z } from "zod";

export const SignInSchema = z.object({
  emailOrPhone: z
    .string()
    .min(1, "Введіть email або номер телефону")
    .refine(
      (val) =>
        z.string().email().safeParse(val).success ||
        /^(\+?\d{10,15})$/.test(val.replace(/\s+/g, "")),
      {
        message: "Введіть коректний email або номер телефону",
      }
    ),
  password: z.string().min(6),
});

export const SignUpSchema = z.object({
  firstName: z.string().min(1, "Введіть ім'я"),
  lastName: z.string().min(1, "Введіть прізвище"),
  phone: z.string()
    .min(1, "Введіть номер телефону")
    .refine(
      (val) => /^(\+?\d{10,15})$/.test(val.replace(/\s+/g, "")),
      {
        message: "Введіть коректний номер телефону",
      }
    ),
  email: z.string()
    .min(1, "Введіть email")
    .email("Введіть коректний email"),
  password: z.string().min(6, "Пароль має містити мінімум 6 символів"),
  confirmPassword: z.string().min(1, "Підтвердіть пароль"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Паролі не співпадають",
  path: ["confirmPassword"],
});
