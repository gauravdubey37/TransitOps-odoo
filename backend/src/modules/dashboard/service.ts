import { DashboardRepository } from './repository';
import { ExecutiveDashboardResponse, DashboardKPIs } from './types';

export class DashboardService {
  private repository: DashboardRepository;

  constructor() {
    this.repository = new DashboardRepository();
  }

  async getExecutiveDashboard(): Promise<ExecutiveDashboardResponse> {
    const rawKpis = await this.repository.getExecutiveKPIs();

    // Mapping raw SQL results to the strictly typed interface
    // Note: raw SQL counts return as strings in 'pg' driver, so we parse them to numbers
    const kpis: DashboardKPIs = {
      fleet_size: parseInt(rawKpis.fleet_size || '0', 10),
      available_drivers: parseInt(rawKpis.available_drivers || '0', 10),
      available_vehicles: parseInt(rawKpis.available_vehicles || '0', 10),
      trips_today: parseInt(rawKpis.trips_today || '0', 10),
      active_trips: parseInt(rawKpis.active_trips || '0', 10),
      maintenance_due: parseInt(rawKpis.maintenance_due || '0', 10),
      fuel_cost: parseFloat(rawKpis.fuel_cost || '0'),
      carbon_emissions: 0 // Mocked for MVP, as requested in plan
    };

    return {
      kpis,
      timestamp: new Date().toISOString()
    };
  }
}
