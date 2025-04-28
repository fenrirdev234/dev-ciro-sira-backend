import { z } from "zod";

// TODO username and password validator
export const usernameValidation = z
  .string()
  .min(6, { message: "Username must be at least 6 char longs" })
  .max(20, { message: "Username cannot exceed 20 characters" })
  .regex(/^[a-z0-9]{6,20}$/, "Username must not contain special characters or uppercase letters");

export const passwordSchema = z
  .string({ message: "Password is required to secure your account" })
  .min(8, { message: "Password must be at least 8 characters long for security" })
  .max(20, { message: "Password cannot exceed 20 characters" })
  .refine((password) => /[A-Z]/.test(password), {
    message: "Password must include at least one uppercase letter (A-Z)",
  })
  .refine((password) => /[a-z]/.test(password), {
    message: "Password must include at least one lowercase letter (a-z)",
  })
  .refine((password) => /[0-9]/.test(password), { message: "Password must include at least one number (0-9)" })
  .refine((password) => /[!@#$%^&*]/.test(password), {
    message: "Password must include at least one special character (e.g., !@#$%)",
  });

export const RegisterSchema = z.object({
  body: z
    .object({
      userName: usernameValidation,
      email: z
        .string()
        .email({
          message: "Please enter a valid email address (e.g., name@example.com)",
        })
        .min(1, { message: "Email address is required" })
        .max(64),
      password: passwordSchema,
      confirmPassword: passwordSchema,
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Passwords don't match",
      path: ["confirmPassword"],
    }),
});

export const LoginSchema = z.object({
  body: z.object({
    email: z
      .string()
      .email({
        message: "Please enter a valid email address (e.g., name@example.com)",
      })
      .min(1, { message: "Email address is required" })
      .max(64),
    password: z.string().nonempty({ message: "Password is required to secure your account" }),
  }),
});

export type LoginBodyType = z.infer<typeof LoginSchema>["body"];
export type RegisterBodyType = z.infer<typeof RegisterSchema>["body"];
