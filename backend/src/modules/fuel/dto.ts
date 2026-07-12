import { z } from 'zod';
import { CreateFuelLogSchema } from './validator';

export type CreateFuelLogDTO = z.infer<typeof CreateFuelLogSchema>;
