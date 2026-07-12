import { TripStatus } from './constants';

export interface TripEntity {
  trip_id: string; // UUID
  driver_id: string; // UUID
  vehicle_id: string; // UUID
  route_id: string; // UUID
  status: TripStatus;
  start_time: Date | null;
  end_time: Date | null;
  planned_distance: number;
  actual_distance: number | null;
  planned_duration: number;
  actual_duration: number | null;
  toll_cost: number;
  carbon_emission: number;
  created_at?: Date;
}
