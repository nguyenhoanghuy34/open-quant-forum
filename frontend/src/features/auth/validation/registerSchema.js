import { z } from "zod";

export const registerSchema = z
    .object({
        username: z
            .string()
            .min(3, "Username must be at least 3 characters")
            .max(50, "Username must be less than 50 characters"),

        email: z
            .string()
            .email("Please enter a valid email"),

        password: z
            .string()
            .min(8, "Password must be at least 8 characters")
            .max(128, "Password is too long"),

        confirmPassword: z
            .string(),

        terms: z
            .boolean()
            .refine(
                (value) => value === true,
                "You must accept the terms"
            ),
    })
    .refine(
        (data) => data.password === data.confirmPassword,
        {
            message: "Passwords do not match",
            path: ["confirmPassword"],
        }
    );
