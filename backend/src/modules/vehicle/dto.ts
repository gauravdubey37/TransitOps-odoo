import { z } from 'zod';
import { CreateVehicleSchema, UpdateVehicleSchema } from './validator';
import { VehicleEntity } from './types';

export type CreateVehicleDTO = z.infer<typeof CreateVehicleSchema>;
export type UpdateVehicleDTO = z.infer<typeof UpdateVehicleSchema>;

export interface VehicleResponseDTO {
  vehicle: VehicleEntity;
}
