import * as z from "zod";

export const CompanyFormSchema = z.object({
  companyName: z.string().min(1, { message: "Company name is required" }),
  tinNumber: z
    .string()
    .min(1, { message: "TIN number is required" })
    .min(10, { message: "TIN number must be 10 digits" })
    .max(10, { message: "TIN number must be 10 digits" }),
  registrationNumber: z
    .string()
    .min(1, { message: "Commercial Registration number is required" }),
  licenseNumber: z.string().min(1, { message: "License number is required" }),
});
