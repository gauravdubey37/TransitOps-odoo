import { z } from 'zod';
import { DRIVER_STATUS } from './constants';

export const CreateDriverSchema = z.object({
  employee_code: z.string().min(1, "Employee code is required"),
  first_name: z.string().min(1, "First name is required"),
  last_name: z.string().min(1, "Last name is required"),
  phone: z.string().min(10, "Valid phone number is required"),
  email: z.string().email("Valid email is required").optional().nullable(),
  address: z.string().optional().nullable(),
  joining_date: z.string().transform((str) => new Date(str)),
  salary: z.number().positive("Salary must be positive"),
});

export const UpdateDriverSchema = CreateDriverSchema.partial().extend({
  driver_status: z.nativeEnum(DRIVER_STATUS).optional(),
  current_region_id: z.string().uuid().optional().nullable(),
  current_depot_id: z.string().uuid().optional().nullable(),
  user_id: z.string().uuid().optional().nullable(),
});

export const AssignTripSchema = z.object({
  trip_id: z.string().uuid("Valid trip ID is required"),
  vehicle_id: z.string().uuid("Valid vehicle ID is required"),
});
