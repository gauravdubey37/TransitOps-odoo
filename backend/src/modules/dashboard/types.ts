export interface DashboardKPIs {
  fleet_size: number;
  available_drivers: number;
  available_vehicles: number;
  trips_today: number;
  active_trips: number;
  maintenance_due: number;
  fuel_cost: number;
  carbon_emissions: number;
}

export interface ExecutiveDashboardResponse {
  kpis: DashboardKPIs;
  timestamp: string;
}
