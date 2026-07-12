import { RouteStatus } from './constants';

export interface RouteEntity {
  id: string; // UUID
  route_code: string;
  name: string;
  source_depot_id: string; // UUID
  destination_depot_id: string; // UUID
  distance_km: number;
  estimated_duration_minutes: number;
  average_fuel_consumption: number | null;
  average_carbon_emission: number | null;
  status: RouteStatus;
  created_at?: Date;
  updated_at?: Date;
}
