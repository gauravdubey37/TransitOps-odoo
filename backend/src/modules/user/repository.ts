import { db } from '../../config/database';
import { UserEntity } from './types';
import { CreateUserDTO, UpdateUserDTO } from './dto';
import { v4 as uuidv4 } from 'uuid';

export class UserRepository {
  async findAll(): Promise<UserEntity[]> {
    const query = `SELECT user_id, full_name, email, role_id, phone, is_active, created_at, updated_at FROM users`;
    const result = await db.query(query);
    return result.rows;
  }

  async findById(id: string): Promise<UserEntity | null> {
    const query = `SELECT * FROM users WHERE user_id = $1`;
    const result = await db.query(query, [id]);
    return result.rows[0] || null;
  }

  async findByEmail(email: string): Promise<UserEntity | null> {
    const query = `SELECT * FROM users WHERE email = $1`;
    const result = await db.query(query, [email]);
    return result.rows[0] || null;
  }

  async create(data: CreateUserDTO, passwordHash: string): Promise<UserEntity> {
    const id = uuidv4();
    const query = `
      INSERT INTO users (
        user_id, full_name, email, password_hash, role_id, phone, is_active, created_at, updated_at
      ) VALUES (
        $1, $2, $3, $4, $5, $6, $7, NOW(), NOW()
      ) RETURNING *
    `;

    const values = [
      id,
      data.full_name,
      data.email,
      passwordHash,
      data.role_id,
      data.phone || null,
      data.is_active !== undefined ? data.is_active : true
    ];

    const result = await db.query(query, values);
    return result.rows[0];
  }

  async update(id: string, data: UpdateUserDTO, passwordHash?: string): Promise<UserEntity | null> {
    const fields: string[] = [];
    const values: any[] = [];
    let paramIndex = 1;

    Object.entries(data).forEach(([key, value]) => {
      if (value !== undefined && key !== 'password') {
        fields.push(`${key} = $${paramIndex}`);
        values.push(value);
        paramIndex++;
      }
    });

    if (passwordHash) {
      fields.push(`password_hash = $${paramIndex}`);
      values.push(passwordHash);
      paramIndex++;
    }

    if (fields.length === 0) return this.findById(id);

    fields.push(`updated_at = NOW()`);
    values.push(id);

    const query = `
      UPDATE users 
      SET ${fields.join(', ')} 
      WHERE user_id = $${paramIndex} 
      RETURNING *
    `;

    const result = await db.query(query, values);
    return result.rows[0] || null;
  }
}
