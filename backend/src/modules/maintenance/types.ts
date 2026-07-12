export enum MaintenanceServiceType {
  Scheduled = 'Scheduled',
  Repair = 'Repair',
  Inspection = 'Inspection',
  Other = 'Other'
}

export interface MaintenanceRecordEntity {
  maintenance_id: string; // UUID
  vehicle_id: string; // UUID
  service_type: MaintenanceServiceType;
  service_date: Date;
  workshop: string | null;
  cost: number; // DECIMAL
  odometer: number | null;
  remarks: string | null;
  next_service_date: Date | null;
}
