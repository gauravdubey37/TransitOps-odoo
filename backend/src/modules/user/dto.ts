import { z } from 'zod';
import { CreateUserSchema, UpdateUserSchema } from './validator';

export type CreateUserDTO = z.infer<typeof CreateUserSchema>;
export type UpdateUserDTO = z.infer<typeof UpdateUserSchema>;
