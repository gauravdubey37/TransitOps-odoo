import { DriverStatus, FatigueLevel } from './constants';

export interface DriverEntity {
  driver_id: string; // UUID
  employee_code: string;
  first_name: string;
  last_name: string;
  phone: string;
  email: string | null;
  address: string | null;
  joining_date: Date;
  salary: number; // numeric(12,2)
  driver_status: DriverStatus;
  current_region_id: string | null; // UUID
  current_depot_id: string | null; // UUID
  user_id: string | null; // UUID
  created_at?: Date;
  updated_at?: Date;
}

export interface DriverExperienceEntity {
  experience_id: string; // UUID
  driver_id: string;
  total_trips: number;
  total_hours: number;
  total_distance: number;
  primary_vehicle_class: string | null;
  primary_route: string | null;
  primary_region: string | null;
  updated_at?: Date;
}

export interface DriverFatigueEntity {
  fatigue_id: string; // UUID
  driver_id: string;
  continuous_hours: number;
  overtime_hours: number;
  mandatory_rest_until: Date | null;
  fatigue_level: FatigueLevel;
  last_reset: Date;
}

export interface DriverLicenseEntity {
  license_id: string; // UUID
  driver_id: string;
  license_number: string;
  license_type: string;
  issue_date: Date;
  expiry_date: Date;
  issuing_authority: string;
  document_path: string | null;
  created_at?: Date;
  updated_at?: Date;
}

export interface DriverInsuranceEntity {
  insurance_id: string; // UUID
  driver_id: string;
  provider: string;
  policy_number: string;
  issue_date: Date;
  expiry_date: Date;
  coverage_amount: number;
  document_path: string | null;
}
