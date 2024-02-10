import * as z from "zod";

export const signUpSchema = z
  .object({
    firstName: z.string().min(1, "First Name is required").max(30),
    lastName: z.string().min(1, "Last Name is required").max(30),
    email: z.string().min(1, "Email is required").email("Invalid Email"),
    password: z
      .string()
      .min(1, "Password is required")
      .min(8, "Password must have at least 8 characters")
      .refine((value) => /[0-9]/.test(value) && /[a-zA-Z]/.test(value), {
        message: "Password must have at leas one letter and one number.",
      }),
    confirmPassword: z.string().min(1, "Password confirmation required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: `Passwords do not match`,
  });
