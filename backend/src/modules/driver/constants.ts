export const DRIVER_STATUS = {
  AVAILABLE: 'Available',
  ASSIGNED: 'Assigned',
  DRIVING: 'Driving',
  PAUSED: 'Paused',
  RESTING: 'Resting',
  COMPLETED: 'Completed',
  OFF_DUTY: 'Off Duty',
  LEAVE: 'Leave',
  INACTIVE: 'Inactive',
} as const;

export type DriverStatus = typeof DRIVER_STATUS[keyof typeof DRIVER_STATUS];

export const FATIGUE_LEVEL = {
  NORMAL: 'NORMAL',
  WARNING: 'WARNING',
  CRITICAL: 'CRITICAL'
} as const;

export type FatigueLevel = typeof FATIGUE_LEVEL[keyof typeof FATIGUE_LEVEL];
