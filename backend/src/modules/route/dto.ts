import { z } from 'zod';
import { CreateRouteSchema, UpdateRouteSchema } from './validator';

export type CreateRouteDTO = z.infer<typeof CreateRouteSchema>;
export type UpdateRouteDTO = z.infer<typeof UpdateRouteSchema>;
