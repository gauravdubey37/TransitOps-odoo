import { z } from 'zod';

export const CreateFuelLogSchema = z.object({
  trip_id: z.string().uuid("Valid trip ID is required").optional().nullable(),
  driver_id: z.string().uuid("Valid driver ID is required"),
  vehicle_id: z.string().uuid("Valid vehicle ID is required"),
  quantity: z.number().positive("Quantity must be greater than zero"),
  cost: z.number().nonnegative("Cost must be non-negative"),
  fuel_station: z.string().optional().nullable(),
  odometer: z.number().int().nonnegative("Odometer reading must be non-negative").optional().nullable(),
  timestamp: z.string().datetime().optional()
});
