import { z } from 'zod';
import { TRIP_STATUS } from './constants';

export const CreateTripSchema = z.object({
  driver_id: z.string().uuid("Valid driver UUID is required"),
  vehicle_id: z.string().uuid("Valid vehicle UUID is required"),
  route_id: z.string().uuid("Valid route UUID is required"),
  planned_distance: z.number().positive("Planned distance must be positive"),
  planned_duration: z.number().positive("Planned duration must be positive"),
  start_time: z.string().datetime().optional().nullable(),
});

export const UpdateTripSchema = z.object({
  status: z.nativeEnum(TRIP_STATUS).optional(),
  start_time: z.string().datetime().optional().nullable(),
  end_time: z.string().datetime().optional().nullable(),
  actual_distance: z.number().nonnegative().optional().nullable(),
  actual_duration: z.number().nonnegative().optional().nullable(),
  toll_cost: z.number().nonnegative().optional(),
  carbon_emission: z.number().nonnegative().optional(),
});
