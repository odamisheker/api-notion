import { z } from "zod";

export const User = z.object({
  email: z.string().email({ message: "Введите правильный email" }),
  password: z
    .string()
    .min(8)
    .regex(/[A-Z]/, {
      message: "Пароль должен содержать как минимум одну заглавную букву",
    })
    .regex(/[a-z]/, {
      message: "Пароль должен содержать как минимум одну прописную букву",
    })
    .regex(/[0-9]/, { message: "Пароль должен содержать как минимум одну цифру" }),
  date: z.number(),
});
