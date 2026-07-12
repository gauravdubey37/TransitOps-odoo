import { z } from 'zod';
import { ExpenseCategory } from './types';

export const CreateExpenseSchema = z.object({
  trip_id: z.string().uuid("Valid trip ID is required"),
  driver_id: z.string().uuid("Valid driver ID is required"),
  category: z.nativeEnum(ExpenseCategory, {
    errorMap: () => ({ message: "Invalid expense category" }),
  }),
  amount: z.number().positive("Amount must be strictly positive"),
  description: z.string().optional().nullable(),
  receipt_path: z.string().optional().nullable(),
  timestamp: z.string().datetime().optional()
});
