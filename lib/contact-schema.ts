import { z } from "zod";

// Shared by the form (inline validation) and the route handler (the real check).
export const contactSchema = z.object({
  name: z.string().trim().min(1, "Please enter your name.").max(100, "Name is too long."),
  email: z.string().trim().max(200, "Email is too long.").pipe(z.email("Please enter a valid email address.")),
  message: z
    .string()
    .trim()
    .min(10, "Please write a little more (at least 10 characters).")
    .max(5000, "Message is too long (5000 characters max)."),
});

export type ContactInput = z.infer<typeof contactSchema>;
export type ContactFieldErrors = Partial<Record<keyof ContactInput, string[]>>;
