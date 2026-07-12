import { z } from 'zod';
import { ROUTE_STATUS } from './constants';

export const CreateRouteSchema = z.object({
  route_code: z.string().min(2, "Route code is required"),
  name: z.string().min(2, "Route name is required"),
  source_depot_id: z.string().uuid("Valid source depot UUID is required"),
  destination_depot_id: z.string().uuid("Valid destination depot UUID is required"),
  distance_km: z.number().positive("Distance must be greater than 0"),
  estimated_duration_minutes: z.number().positive("Estimated duration must be greater than 0"),
  average_fuel_consumption: z.number().nonnegative().optional().nullable(),
  average_carbon_emission: z.number().nonnegative().optional().nullable(),
});

export const UpdateRouteSchema = z.object({
  route_code: z.string().min(2).optional(),
  name: z.string().min(2).optional(),
  source_depot_id: z.string().uuid().optional(),
  destination_depot_id: z.string().uuid().optional(),
  distance_km: z.number().positive().optional(),
  estimated_duration_minutes: z.number().positive().optional(),
  average_fuel_consumption: z.number().nonnegative().optional().nullable(),
  average_carbon_emission: z.number().nonnegative().optional().nullable(),
  status: z.nativeEnum(ROUTE_STATUS).optional(),
});
