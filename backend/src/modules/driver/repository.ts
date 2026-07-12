import { db } from '../../config/database';
import { DriverEntity } from './types';
import { CreateDriverDTO, UpdateDriverDTO } from './dto';
import { v4 as uuidv4 } from 'uuid';

export class DriverRepository {
  async findAll(): Promise<DriverEntity[]> {
    const query = `SELECT * FROM drivers`;
    const result = await db.query(query);
    return result.rows;
  }

  async findById(driverId: string): Promise<DriverEntity | null> {
    const query = `SELECT * FROM drivers WHERE driver_id = $1`;
    const result = await db.query(query, [driverId]);
    return result.rows[0] || null;
  }

  async findByEmployeeCode(employeeCode: string): Promise<DriverEntity | null> {
    const query = `SELECT * FROM drivers WHERE employee_code = $1`;
    const result = await db.query(query, [employeeCode]);
    return result.rows[0] || null;
  }

  async create(data: CreateDriverDTO): Promise<DriverEntity> {
    const id = uuidv4();
    const status = 'Available'; // default status

    const query = `
      INSERT INTO drivers (
        driver_id, employee_code, first_name, last_name, phone, 
        email, address, joining_date, salary, driver_status, 
        created_at, updated_at
      ) VALUES (
        $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, NOW(), NOW()
      ) RETURNING *
    `;

    const values = [
      id,
      data.employee_code,
      data.first_name,
      data.last_name,
      data.phone,
      data.email,
      data.address,
      data.joining_date,
      data.salary,
      status
    ];

    const result = await db.query(query, values);
    return result.rows[0];
  }

  async update(driverId: string, data: UpdateDriverDTO): Promise<DriverEntity | null> {
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

    if (fields.length === 0) return this.findById(driverId);

    fields.push(`updated_at = NOW()`);
    values.push(driverId);

    const query = `
      UPDATE drivers 
      SET ${fields.join(', ')} 
      WHERE driver_id = $${paramIndex} 
      RETURNING *
    `;

    const result = await db.query(query, values);
    return result.rows[0] || null;
  }

  async delete(driverId: string): Promise<boolean> {
    const query = `DELETE FROM drivers WHERE driver_id = $1`;
    const result = await db.query(query, [driverId]);
    return (result.rowCount || 0) > 0;
  }
}
