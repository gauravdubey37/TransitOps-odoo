import { z } from 'zod';

export const CreateUserSchema = z.object({
  full_name: z.string().min(2, "Full name is required"),
  email: z.string().email("Valid email is required"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  role_id: z.string().uuid("Valid role ID is required"),
  phone: z.string().optional().nullable(),
  is_active: z.boolean().optional().default(true),
});

export const UpdateUserSchema = CreateUserSchema.partial().omit({ password: true });
