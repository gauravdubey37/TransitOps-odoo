export const ROUTE_STATUS = {
  ACTIVE: 'Active',
  INACTIVE: 'Inactive',
  ARCHIVED: 'Archived'
} as const;

export type RouteStatus = typeof ROUTE_STATUS[keyof typeof ROUTE_STATUS];
