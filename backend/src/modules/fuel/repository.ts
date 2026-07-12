import { db } from '../../config/database';
import { FuelLogEntity } from './types';
import { CreateFuelLogDTO } from './dto';
import { v4 as uuidv4 } from 'uuid';

export class FuelRepository {
  async findAll(): Promise<FuelLogEntity[]> {
    const query = `SELECT * FROM fuel_logs ORDER BY timestamp DESC`;
    const result = await db.query(query);
    return result.rows;
  }

  async findById(id: string): Promise<FuelLogEntity | null> {
    const query = `SELECT * FROM fuel_logs WHERE fuel_log_id = $1`;
    const result = await db.query(query, [id]);
    return result.rows[0] || null;
  }

  async findByVehicleId(vehicleId: string): Promise<FuelLogEntity[]> {
    const query = `SELECT * FROM fuel_logs WHERE vehicle_id = $1 ORDER BY timestamp DESC`;
    const result = await db.query(query, [vehicleId]);
    return result.rows;
  }
  
  async findByTripId(tripId: string): Promise<FuelLogEntity[]> {
    const query = `SELECT * FROM fuel_logs WHERE trip_id = $1 ORDER BY timestamp DESC`;
    const result = await db.query(query, [tripId]);
    return result.rows;
  }

  async create(data: CreateFuelLogDTO): Promise<FuelLogEntity> {
    const id = uuidv4();
    const query = `
      INSERT INTO fuel_logs (
        fuel_log_id, trip_id, driver_id, vehicle_id, quantity, cost, fuel_station, odometer, timestamp
      ) VALUES (
        $1, $2, $3, $4, $5, $6, $7, $8, COALESCE($9, NOW())
      ) RETURNING *
    `;

    const values = [
      id,
      data.trip_id || null,
      data.driver_id,
      data.vehicle_id,
      data.quantity,
      data.cost,
      data.fuel_station || null,
      data.odometer || null,
      data.timestamp || null
    ];

    const result = await db.query(query, values);
    return result.rows[0];
  }
}
