import { z } from 'zod';
import { CreateMaintenanceSchema } from './validator';

export type CreateMaintenanceDTO = z.infer<typeof CreateMaintenanceSchema>;
