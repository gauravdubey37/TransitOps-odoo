import { db } from '../../config/database';
import { RouteEntity } from './types';
import { CreateRouteDTO, UpdateRouteDTO } from './dto';
import { v4 as uuidv4 } from 'uuid';
import { ROUTE_STATUS } from './constants';

export class RouteRepository {
  async findAll(): Promise<RouteEntity[]> {
    const query = `SELECT * FROM routes`;
    const result = await db.query(query);
    return result.rows;
  }

  async findById(id: string): Promise<RouteEntity | null> {
    const query = `SELECT * FROM routes WHERE id = $1`;
    const result = await db.query(query, [id]);
    return result.rows[0] || null;
  }

  async findByRouteCode(code: string): Promise<RouteEntity | null> {
    const query = `SELECT * FROM routes WHERE route_code = $1`;
    const result = await db.query(query, [code]);
    return result.rows[0] || null;
  }

  async findBySourceAndDestination(sourceId: string, destinationId: string): Promise<RouteEntity | null> {
    const query = `SELECT * FROM routes WHERE source_depot_id = $1 AND destination_depot_id = $2`;
    const result = await db.query(query, [sourceId, destinationId]);
    return result.rows[0] || null;
  }

  async create(data: CreateRouteDTO): Promise<RouteEntity> {
    const id = uuidv4();
    const status = ROUTE_STATUS.ACTIVE;
    const query = `
      INSERT INTO routes (
        id, route_code, name, source_depot_id, destination_depot_id, 
        distance_km, estimated_duration_minutes, average_fuel_consumption, 
        average_carbon_emission, status, created_at, updated_at
      ) VALUES (
        $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, NOW(), NOW()
      ) RETURNING *
    `;

    const values = [
      id,
      data.route_code,
      data.name,
      data.source_depot_id,
      data.destination_depot_id,
      data.distance_km,
      data.estimated_duration_minutes,
      data.average_fuel_consumption || null,
      data.average_carbon_emission || null,
      status
    ];

    const result = await db.query(query, values);
    return result.rows[0];
  }

  async update(id: string, data: UpdateRouteDTO): Promise<RouteEntity | null> {
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

    if (fields.length === 0) return this.findById(id);

    fields.push(`updated_at = NOW()`);
    values.push(id);

    const query = `
      UPDATE routes 
      SET ${fields.join(', ')} 
      WHERE id = $${paramIndex} 
      RETURNING *
    `;

    const result = await db.query(query, values);
    return result.rows[0] || null;
  }
}
