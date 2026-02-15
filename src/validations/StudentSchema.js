import { z } from "zod";

export  const studentSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(2, "First name must be at least 2 characters"),

  lastName: z
    .string()
    .trim()
    .min(2, "Last name must be at least 2 characters"),

  email: z
    .string()
    .trim()
    .email("Invalid email address"),

  phone: z
    .string()
    .regex(/^(?:\+94|0)?7\d{8}$/, "Invalid Sri Lankan phone number"),

  password: z
    .string()
    .min(6, "Password must be at least 6 characters"),

  birthday: z
    .string()
    .refine((date) => !isNaN(Date.parse(date)), {
      message: "Invalid date",
    })
    .refine((date) => new Date(date) < new Date(), {
      message: "Birthday must be in the past",
    }),
});
