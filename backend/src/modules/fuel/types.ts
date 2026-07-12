export interface FuelLogEntity {
  fuel_log_id: string; // UUID
  trip_id: string | null; // UUID
  driver_id: string; // UUID
  vehicle_id: string; // UUID
  quantity: number; // DECIMAL
  cost: number; // DECIMAL
  fuel_station: string | null;
  odometer: number | null;
  timestamp: Date;
}
