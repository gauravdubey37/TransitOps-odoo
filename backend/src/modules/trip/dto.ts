import { z } from 'zod';
import { CreateTripSchema, UpdateTripSchema } from './validator';
import { TripEntity } from './types';

export type CreateTripDTO = z.infer<typeof CreateTripSchema>;
export type UpdateTripDTO = z.infer<typeof UpdateTripSchema>;

export interface TripResponseDTO {
  trip: TripEntity;
}
