import { z } from 'zod';

export const VoiceIntentSchema = z.object({
  payload: z.string().min(1, "Payload cannot be empty")
});

export const VoiceConfirmSchema = z.object({
  intent: z.string().min(1, "Intent is required"),
  data: z.record(z.string(), z.any()).optional()
});
