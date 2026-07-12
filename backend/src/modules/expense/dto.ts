import { z } from 'zod';
import { CreateExpenseSchema } from './validator';

export type CreateExpenseDTO = z.infer<typeof CreateExpenseSchema>;
