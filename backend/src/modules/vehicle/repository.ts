import { db } from '../../config/database';
import { VehicleEntity } from './types';
import { CreateVehicleDTO, UpdateVehicleDTO } from './dto';
import { v4 as uuidv4 } from 'uuid';

export class VehicleRepository {
  async findAll(): Promise<VehicleEntity[]> {
    const query = `SELECT * FROM vehicles`;
    const result = await db.query(query);
    return result.rows;
  }

  async findById(vehicleId: string): Promise<VehicleEntity | null> {
    const query = `SELECT * FROM vehicles WHERE vehicle_id = $1`;
    const result = await db.query(query, [vehicleId]);
    return result.rows[0] || null;
  }

  async findByRegistration(registrationNumber: string): Promise<VehicleEntity | null> {
    const query = `SELECT * FROM vehicles WHERE registration_number = $1`;
    const result = await db.query(query, [registrationNumber]);
    return result.rows[0] || null;
  }

  async create(data: CreateVehicleDTO): Promise<VehicleEntity> {
    const id = uuidv4();
    const status = 'Available'; // Default status

    const query = `
      INSERT INTO vehicles (
        vehicle_id, registration_number, vehicle_class, manufacturer, model,
        manufacturing_year, fuel_type, mileage, load_capacity, current_odometer,
        status, created_at, updated_at
      ) VALUES (
        $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, NOW(), NOW()
      ) RETURNING *
    `;

    const values = [
      id,
      data.registration_number,
      data.vehicle_class,
      data.manufacturer,
      data.model,
      data.manufacturing_year,
      data.fuel_type,
      data.mileage,
      data.load_capacity,
      data.current_odometer,
      status
    ];

    const result = await db.query(query, values);
    return result.rows[0];
  }

  async update(vehicleId: string, data: UpdateVehicleDTO): Promise<VehicleEntity | null> {
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

    if (fields.length === 0) return this.findById(vehicleId);

    fields.push(`updated_at = NOW()`);
    values.push(vehicleId);

    const query = `
      UPDATE vehicles 
      SET ${fields.join(', ')} 
      WHERE vehicle_id = $${paramIndex} 
      RETURNING *
    `;

    const result = await db.query(query, values);
    return result.rows[0] || null;
  }

  async delete(vehicleId: string): Promise<boolean> {
    const query = `DELETE FROM vehicles WHERE vehicle_id = $1`;
    const result = await db.query(query, [vehicleId]);
    return (result.rowCount || 0) > 0;
  }
}
