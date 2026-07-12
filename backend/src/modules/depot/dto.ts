import { z } from 'zod';
import { CreateDepotSchema, UpdateDepotSchema } from './validator';

export type CreateDepotDTO = z.infer<typeof CreateDepotSchema>;
export type UpdateDepotDTO = z.infer<typeof UpdateDepotSchema>;
