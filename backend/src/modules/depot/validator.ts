import { z } from 'zod';

export const CreateDepotSchema = z.object({
  name: z.string().min(2, "Name is required"),
  code: z.string().min(2, "Code is required"),
  address: z.string().min(5, "Address is required"),
  city: z.string().min(2, "City is required"),
  state: z.string().min(2, "State is required"),
  latitude: z.number().optional().nullable(),
  longitude: z.number().optional().nullable(),
});

export const UpdateDepotSchema = CreateDepotSchema.partial();
