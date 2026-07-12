import { db } from '../../config/database';
import { TripEntity } from './types';
import { CreateTripDTO, UpdateTripDTO } from './dto';
import { v4 as uuidv4 } from 'uuid';
import { TRIP_STATUS } from './constants';

export class TripRepository {
  async findAll(): Promise<TripEntity[]> {
    const query = `SELECT * FROM trips`;
    const result = await db.query(query);
    return result.rows;
  }

  async findById(tripId: string): Promise<TripEntity | null> {
    const query = `SELECT * FROM trips WHERE trip_id = $1`;
    const result = await db.query(query, [tripId]);
    return result.rows[0] || null;
  }

  async hasActiveTrip(resourceType: 'driver_id' | 'vehicle_id', resourceId: string): Promise<boolean> {
    const query = `
      SELECT 1 FROM trips 
      WHERE ${resourceType} = $1 
      AND status IN ($2, $3)
      LIMIT 1
    `;
    const result = await db.query(query, [resourceId, TRIP_STATUS.PLANNED, TRIP_STATUS.IN_PROGRESS]);
    return (result.rowCount || 0) > 0;
  }

  async create(data: CreateTripDTO): Promise<TripEntity> {
    const id = uuidv4();
    const status = TRIP_STATUS.PLANNED;

    const query = `
      INSERT INTO trips (
        trip_id, driver_id, vehicle_id, route_id, status,
        start_time, end_time, planned_distance, actual_distance,
        planned_duration, actual_duration, toll_cost, carbon_emission,
        created_at
      ) VALUES (
        $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, NOW()
      ) RETURNING *
    `;

    const values = [
      id,
      data.driver_id,
      data.vehicle_id,
      data.route_id,
      status,
      data.start_time || null,
      null, // end_time
      data.planned_distance,
      null, // actual_distance
      data.planned_duration,
      null, // actual_duration
      0, // toll_cost default
      0  // carbon_emission default
    ];

    const result = await db.query(query, values);
    return result.rows[0];
  }

  async update(tripId: string, data: UpdateTripDTO): Promise<TripEntity | null> {
    const fields: string[] = [];
    const values: any[] = [];
    let paramIndex = 1;

    Object.entries(data).forEach(([key, value]) => {
      if (value !== undefined) {
        fields.push(`${key} = $${paramIndex}`);
        values.push(value);
        paramIndex++;
      }
    });

    if (fields.length === 0) return this.findById(tripId);

    values.push(tripId);

    const query = `
      UPDATE trips 
      SET ${fields.join(', ')} 
      WHERE trip_id = $${paramIndex} 
      RETURNING *
    `;

    const result = await db.query(query, values);
    return result.rows[0] || null;
  }
}
