import { z } from 'zod';
import { VEHICLE_CLASS, FUEL_TYPE, VEHICLE_STATUS } from './constants';

export const CreateVehicleSchema = z.object({
  registration_number: z.string().min(1, 'Registration number is required'),
  vehicle_class: z.nativeEnum(VEHICLE_CLASS),
  manufacturer: z.string().min(1, 'Manufacturer is required'),
  model: z.string().min(1, 'Model is required'),
  manufacturing_year: z.number().int().min(1900).max(new Date().getFullYear() + 1),
  fuel_type: z.nativeEnum(FUEL_TYPE),
  mileage: z.number().positive('Mileage must be positive'),
  load_capacity: z.number().positive('Load capacity must be positive'),
  current_odometer: z.number().nonnegative('Odometer cannot be negative'),
});

export const UpdateVehicleSchema = CreateVehicleSchema.partial().extend({
  status: z.nativeEnum(VEHICLE_STATUS).optional(),
});
