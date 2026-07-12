import { db } from '../../config/database';

export class DashboardRepository {
  async getExecutiveKPIs(): Promise<any> {
    const query = `
      SELECT
        (SELECT count(*) FROM vehicles) as fleet_size,
        (SELECT count(*) FROM drivers WHERE status = 'Available') as available_drivers,
        (SELECT count(*) FROM vehicles WHERE status = 'Available') as available_vehicles,
        (SELECT count(*) FROM trips WHERE start_time::date = CURRENT_DATE) as trips_today,
        (SELECT count(*) FROM trips WHERE status = 'In Progress') as active_trips,
        (SELECT count(*) FROM maintenance_records WHERE next_service_date <= CURRENT_DATE + INTERVAL '7 days') as maintenance_due,
        COALESCE((SELECT sum(cost) FROM fuel_logs), 0) as fuel_cost
    `;

    const result = await db.query(query);
    return result.rows[0];
  }
}
