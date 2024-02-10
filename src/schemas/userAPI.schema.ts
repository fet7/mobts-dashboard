import * as z from "zod";

export const signUpSchema = z.object({
  firstName: z.string().min(1, { message: "First name is required" }).max(30),
  lastName: z.string().min(1, { message: "Last name is required" }).max(30),
  email: z
    .string()
    .email({ message: "Email is invalid" })
    .min(1, { message: "Email is required" }),
  password: z
    .string()
    .min(1, { message: "Password is required" })
    .min(8, { message: "Password must be at least 8 characters" })
    .refine((value) => /[0-9]/.test(value) && /[a-zA-Z]/.test(value), {
      message: "Password must contain at least one number and one letter",
    }),
});
