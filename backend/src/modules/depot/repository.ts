import { db } from '../../config/database';
import { DepotEntity } from './types';
import { CreateDepotDTO, UpdateDepotDTO } from './dto';
import { v4 as uuidv4 } from 'uuid';

export class DepotRepository {
  async findAll(): Promise<DepotEntity[]> {
    const query = `SELECT * FROM depots`;
    const result = await db.query(query);
    return result.rows;
  }

  async findById(id: string): Promise<DepotEntity | null> {
    const query = `SELECT * FROM depots WHERE id = $1`;
    const result = await db.query(query, [id]);
    return result.rows[0] || null;
  }

  async findByCode(code: string): Promise<DepotEntity | null> {
    const query = `SELECT * FROM depots WHERE code = $1`;
    const result = await db.query(query, [code]);
    return result.rows[0] || null;
  }

  async create(data: CreateDepotDTO): Promise<DepotEntity> {
    const id = uuidv4();
    const query = `
      INSERT INTO depots (
        id, name, code, address, city, state, latitude, longitude, created_at, updated_at
      ) VALUES (
        $1, $2, $3, $4, $5, $6, $7, $8, NOW(), NOW()
      ) RETURNING *
    `;

    const values = [
      id,
      data.name,
      data.code,
      data.address,
      data.city,
      data.state,
      data.latitude || null,
      data.longitude || null
    ];

    const result = await db.query(query, values);
    return result.rows[0];
  }

  async update(id: string, data: UpdateDepotDTO): Promise<DepotEntity | null> {
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
      UPDATE depots 
      SET ${fields.join(', ')} 
      WHERE id = $${paramIndex} 
      RETURNING *
    `;

    const result = await db.query(query, values);
    return result.rows[0] || null;
  }
}
