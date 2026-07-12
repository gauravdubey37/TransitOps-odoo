import { z } from 'zod';
import { LoginSchema, RefreshTokenSchema, ChangePasswordSchema } from './validator';

export type LoginDTO = z.infer<typeof LoginSchema>;
export type RefreshTokenDTO = z.infer<typeof RefreshTokenSchema>;
export type ChangePasswordDTO = z.infer<typeof ChangePasswordSchema>;
