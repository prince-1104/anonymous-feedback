// lib/validations/verify.ts
import { z } from 'zod';

export const verifySchema = z.object({
  code: z
    .string()
    .length(6, { message: 'Verification code must be exactly 6 digits.' })
    .regex(/^\d+$/, { message: 'Code must contain only numbers.' }),
});

export type VerifyInput = z.infer<typeof verifySchema>;
