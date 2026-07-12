export const TRIP_STATUS = {
  PLANNED: 'Planned',
  IN_PROGRESS: 'In Progress',
  COMPLETED: 'Completed',
  CANCELLED: 'Cancelled',
  PAUSED: 'Paused'
} as const;

export type TripStatus = typeof TRIP_STATUS[keyof typeof TRIP_STATUS];
