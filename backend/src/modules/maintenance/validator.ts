import { z } from 'zod';
import { MaintenanceServiceType } from './types';

export const CreateMaintenanceSchema = z.object({
  vehicle_id: z.string().uuid("Valid vehicle ID is required"),
  service_type: z.nativeEnum(MaintenanceServiceType, {
    errorMap: () => ({ message: "Invalid service type" }),
  }),
  service_date: z.string().datetime("Valid service date is required"),
  workshop: z.string().optional().nullable(),
  cost: z.number().nonnegative("Cost must be non-negative"),
  odometer: z.number().int().nonnegative("Odometer reading must be non-negative").optional().nullable(),
  remarks: z.string().optional().nullable(),
  next_service_date: z.string().datetime().optional().nullable(),
});
