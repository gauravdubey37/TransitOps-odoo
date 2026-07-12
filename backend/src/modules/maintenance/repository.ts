import { db } from '../../config/database';
import { MaintenanceRecordEntity } from './types';
import { CreateMaintenanceDTO } from './dto';
import { v4 as uuidv4 } from 'uuid';

export class MaintenanceRepository {
  async findAll(): Promise<MaintenanceRecordEntity[]> {
    const query = `SELECT * FROM maintenance_records ORDER BY service_date DESC`;
    const result = await db.query(query);
    return result.rows;
  }

  async findById(id: string): Promise<MaintenanceRecordEntity | null> {
    const query = `SELECT * FROM maintenance_records WHERE maintenance_id = $1`;
    const result = await db.query(query, [id]);
    return result.rows[0] || null;
  }

  async findByVehicleId(vehicleId: string): Promise<MaintenanceRecordEntity[]> {
    const query = `SELECT * FROM maintenance_records WHERE vehicle_id = $1 ORDER BY service_date DESC`;
    const result = await db.query(query, [vehicleId]);
    return result.rows;
  }

  async create(data: CreateMaintenanceDTO): Promise<MaintenanceRecordEntity> {
    const id = uuidv4();
    const query = `
      INSERT INTO maintenance_records (
        maintenance_id, vehicle_id, service_type, service_date, workshop, cost, odometer, remarks, next_service_date
      ) VALUES (
        $1, $2, $3, $4, $5, $6, $7, $8, $9
      ) RETURNING *
    `;

    const values = [
      id,
      data.vehicle_id,
      data.service_type,
      data.service_date,
      data.workshop || null,
      data.cost,
      data.odometer || null,
      data.remarks || null,
      data.next_service_date || null
    ];

    const result = await db.query(query, values);
    return result.rows[0];
  }
}
