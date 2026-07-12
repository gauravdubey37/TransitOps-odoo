import { z } from 'zod';
import { CreateDriverSchema, UpdateDriverSchema, AssignTripSchema } from './validator';
import { DriverEntity, DriverStatisticsDTO, FatigueDTO, ExperienceDTO, ComplianceDTO } from './types'; // Assuming we export interfaces for standard objects if not using Zod for everything

export type CreateDriverDTO = z.infer<typeof CreateDriverSchema>;
export type UpdateDriverDTO = z.infer<typeof UpdateDriverSchema>;
export type AssignTripDTO = z.infer<typeof AssignTripSchema>;

// Response DTOs
export interface DriverResponseDTO {
  driver: DriverEntity;
}
