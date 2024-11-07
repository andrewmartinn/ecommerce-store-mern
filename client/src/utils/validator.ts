import { z } from "zod";

export const loginFormSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(1, "Password is required"),
});

export const registerFormSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .max(250, "Name character limit exceeded"),
  email: z.string().email("Invalid email"),
  password: z.string().min(1, "Password is required"),
});

export type ILoginForm = z.infer<typeof loginFormSchema>;
export type IRegisterForm = z.infer<typeof registerFormSchema>;
