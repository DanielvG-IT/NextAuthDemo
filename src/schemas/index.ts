import * as z from "zod";
import { UserRole } from "@prisma/client";

export const LoginSchema = z.object({
  email: z.string().email({ message: "Email is required" }),
  password: z.string().min(1, { message: "Password is required" }),
  code: z.string().optional(),
});

export const RegisterSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" }),
});

export const ResetPasswordSchema = z.object({
  email: z.string().email({ message: "Email is required" }),
});

export const NewPasswordSchema = z.object({
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" }),
});

export const SettingsSchema = z
  .object({
    name: z.string().optional(),
    TwoFactorEnabled: z.boolean().optional(),
    role: z.enum([UserRole.USER, UserRole.ADMIN], {
      message: "Role is required",
    }),
    email: z.string().email({ message: "Invalid email address" }).optional(),
    password: z.string().optional(),
    newPassword: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.password && !data.newPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "New password is required!",
        path: ["newPassword"],
      });
    }
    if (data.newPassword && !data.password) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Password is required!",
        path: ["password"],
      });
    }
    if (data.newPassword && data.newPassword?.length < 6) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Password must be at least 6 characters long!",
        path: ["newPassword"],
      });
    }
  });
