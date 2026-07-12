import { VehicleClass, FuelType, VehicleStatus } from './constants';

export interface VehicleEntity {
  vehicle_id: string; // UUID
  registration_number: string;
  vehicle_class: VehicleClass;
  manufacturer: string;
  model: string;
  manufacturing_year: number;
  fuel_type: FuelType;
  mileage: number; // NUMERIC
  load_capacity: number; // NUMERIC
  current_odometer: number; // NUMERIC
  status: VehicleStatus;
  created_at?: Date;
  updated_at?: Date;
}
