export const VEHICLE_CLASS = {
  TRUCK: 'Truck',
  MINI_TRUCK: 'Mini Truck',
  TRAILER: 'Trailer',
  BUS: 'Bus',
  VAN: 'Van',
  CAR: 'Car',
  PICKUP: 'Pickup',
  CONTAINER: 'Container'
} as const;

export type VehicleClass = typeof VEHICLE_CLASS[keyof typeof VEHICLE_CLASS];

export const FUEL_TYPE = {
  DIESEL: 'Diesel',
  PETROL: 'Petrol',
  CNG: 'CNG',
  LNG: 'LNG',
  ELECTRIC: 'Electric',
  HYBRID: 'Hybrid',
  HYDROGEN: 'Hydrogen'
} as const;

export type FuelType = typeof FUEL_TYPE[keyof typeof FUEL_TYPE];

export const VEHICLE_STATUS = {
  AVAILABLE: 'Available',
  ASSIGNED: 'Assigned',
  IN_TRANSIT: 'In Transit',
  MAINTENANCE: 'Maintenance',
  SERVICE_DUE: 'Service Due',
  OUT_OF_SERVICE: 'Out of Service',
  RETIRED: 'Retired',
  INACTIVE: 'Inactive'
} as const;

export type VehicleStatus = typeof VEHICLE_STATUS[keyof typeof VEHICLE_STATUS];
