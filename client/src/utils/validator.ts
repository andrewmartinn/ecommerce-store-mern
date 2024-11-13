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

export const addressFormSchema = z.object({
  firstName: z
    .string()
    .min(1, "First name is required")
    .max(250, "First name should not exceed 250 characters"),
  lastName: z
    .string()
    .min(1, "Last name is required")
    .max(250, "Last name should not be more than 250 characters"),
  email: z.string().email("Invalid email"),
  street: z
    .string()
    .min(1, "Address is required")
    .max(550, "Address should not be more than 550 characters"),
  city: z
    .string()
    .min(1, "City is required")
    .max(250, "City should not be more than 250 characters"),
  state: z
    .string()
    .min(1, "State is required")
    .max(250, "State should not be more than 250 characters"),
  zipcode: z
    .string()
    .min(1, "Zip code is required")
    .max(100, "Zip code must be less than 100 characters"),
  country: z
    .string()
    .min(1, "Country is required")
    .max(250, "Country should not be more than 250 characters"),
  phone: z.string().min(1, "Phone is required"),
});

export type ILoginForm = z.infer<typeof loginFormSchema>;
export type IAddressForm = z.infer<typeof addressFormSchema>;
export type IRegisterForm = z.infer<typeof registerFormSchema>;
