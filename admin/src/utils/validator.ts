import { z } from "zod";

export const loginFormSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(1, "Password required"),
});

export type ILoginForm = z.infer<typeof loginFormSchema>;
