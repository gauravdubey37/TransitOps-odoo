import { db } from '../../config/database';
import { TripExpenseEntity } from './types';
import { CreateExpenseDTO } from './dto';
import { v4 as uuidv4 } from 'uuid';

export class ExpenseRepository {
  async findAll(): Promise<TripExpenseEntity[]> {
    const query = `SELECT * FROM trip_expenses ORDER BY timestamp DESC`;
    const result = await db.query(query);
    return result.rows;
  }

  async findById(id: string): Promise<TripExpenseEntity | null> {
    const query = `SELECT * FROM trip_expenses WHERE expense_id = $1`;
    const result = await db.query(query, [id]);
    return result.rows[0] || null;
  }

  async findByTripId(tripId: string): Promise<TripExpenseEntity[]> {
    const query = `SELECT * FROM trip_expenses WHERE trip_id = $1 ORDER BY timestamp DESC`;
    const result = await db.query(query, [tripId]);
    return result.rows;
  }

  async create(data: CreateExpenseDTO): Promise<TripExpenseEntity> {
    const id = uuidv4();
    const query = `
      INSERT INTO trip_expenses (
        expense_id, trip_id, driver_id, category, amount, description, receipt_path, timestamp
      ) VALUES (
        $1, $2, $3, $4, $5, $6, $7, COALESCE($8, NOW())
      ) RETURNING *
    `;

    const values = [
      id,
      data.trip_id,
      data.driver_id,
      data.category,
      data.amount,
      data.description || null,
      data.receipt_path || null,
      data.timestamp || null
    ];

    const result = await db.query(query, values);
    return result.rows[0];
  }
}
