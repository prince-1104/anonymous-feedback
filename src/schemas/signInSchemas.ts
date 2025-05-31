// lib/validations/auth.ts (or signIn.ts if splitting files)
import { z } from 'zod';

export const signInSchema = z.object({
  identifier: z
    .string()
    .min(1, { message: 'Email or username is required' }),
    
  password: z
    .string()
    .min(1, { message: 'Password is required' }),
});

// Optional: export type for use in server actions or form libs
export type SignInInput = z.infer<typeof signInSchema>;
