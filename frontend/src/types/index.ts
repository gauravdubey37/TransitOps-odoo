export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  department: string;
  role: 'Administrator' | 'Operations Manager' | 'Fleet Manager' | 'Dispatcher' | 'Driver';
  status: 'Active' | 'Inactive';
  lastLogin: string;
}

export interface Driver {
  id: string;
  name: string;
  licenseNumber: string;
  licenseExpiry: string;
  insuranceExpiry: string;
  phone: string;
  depotId: string;
  status: 'Available' | 'Assigned' | 'Fatigued' | 'Inactive';
  fatigueScore: number;
  safetyScore: number;
  completedTrips: number;
  rating: number;
}

export interface Vehicle {
  id: string;
  plateNumber: string;
  model: string;
  type: string;
  status: 'Available' | 'Assigned' | 'Maintenance' | 'Out of Service';
  fuelLevel: number;
  healthScore: number;
  depotId: string;
  mileage: number;
  odometer: number;
  tireHealth: {
    frontLeft: number;
    frontRight: number;
    rearLeftInner: number;
    rearLeftOuter: number;
    rearRightInner: number;
    rearRightOuter: number;
  };
  nextMaintenance: string;
}

export interface Trip {
  id: string;
  tripNumber: string;
  driverId: string;
  driverName: string;
  vehicleId: string;
  vehiclePlate: string;
  origin: string;
  destination: string;
  status: 'Draft' | 'Assigned' | 'In Transit' | 'Completed' | 'Delayed' | 'Cancelled';
  startDateTime: string;
  endDateTime: string | null;
  route: string;
  distanceKm: number;
  progress: number;
  estimatedDurationHours: number;
  carbonEmissionKg: number;
}

export interface FuelLog {
  id: string;
  vehicleId: string;
  driverId: string;
  date: string;
  liters: number;
  cost: number;
  odometer: number;
  location: string;
}

export interface Expense {
  id: string;
  tripId: string;
  driverId: string;
  date: string;
  type: 'Toll' | 'Fuel' | 'Food' | 'Maintenance' | 'Other';
  amount: number;
  description: string;
  status: 'Pending' | 'Approved' | 'Rejected';
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  severity: 'Critical' | 'Warning' | 'Info';
  read: boolean;
  timestamp: string;
}

export interface SystemSettings {
  orgName: string;
  timezone: string;
  currency: string;
  distanceUnit: 'km' | 'miles';
  fuelUnit: 'L' | 'gallons';
  carbonUnit: 'kg' | 'lbs';
  theme: 'Light' | 'Dark' | 'System';
}
