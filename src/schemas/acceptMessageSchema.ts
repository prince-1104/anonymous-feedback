// lib/validations/settings.ts (or wherever it fits)
import { z } from 'zod';

export const AcceptMessageSchema = z.object({
  acceptMessages: z.boolean(),
});

export type AcceptMessageInput = z.infer<typeof AcceptMessageSchema>;
