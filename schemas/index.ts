import { z } from "zod"

export const RegisterSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  password: z.string()
    .min(8, "Password must be at least 8 characters")
    .max(32, "Password must be less than 32 characters"),
  confirmPassword: z.string(),
  agreeToTerms: z.boolean().refine((val) => val === true, {
    message: "You must agree to the terms and conditions"
  })
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"]
});

export const LoginSchema = z.object({
  email: z.string({ required_error: "Email is required" })
    .min(1, "Email is required")
    .email("Invalid email"),
  password: z.string({ required_error: "Password is required" })
    .min(1, "Password is required")
    .min(8, "Password must be more than 8 characters")
    .max(32, "Password must be less than 32 characters"),
});

export const ResetSchema = z.object({
  email: z.string({ required_error: "Email is required" })
    .min(1, "Email is required")
    .email("Invalid email"),
});

export const NewPasswordSchema = z.object({
  password: z.string()
    .min(8, "Password must be at least 8 characters")
    .max(32, "Password must be less than 32 characters"),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"]
});

export const ProfileFormSchema = z
  .object({
    name: z.string().min(1, 'Name is required'),
  });

// Export types
export type RegisterFormValues = z.infer<typeof RegisterSchema>;
export type LoginFormValues = z.infer<typeof LoginSchema>;
export type ResetFormValue = z.infer<typeof ResetSchema>
export type NewPasswordFormValue = z.infer<typeof NewPasswordSchema>;
export type ProfileFormValues = z.infer<typeof ProfileFormSchema>
