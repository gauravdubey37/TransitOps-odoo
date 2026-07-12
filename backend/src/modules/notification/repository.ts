import { db } from '../../config/database';
import { NotificationEntity } from './types';
import { CreateNotificationDTO } from './dto';
import { v4 as uuidv4 } from 'uuid';

export class NotificationRepository {
  async findAllByUserId(userId: string): Promise<NotificationEntity[]> {
    const query = `SELECT * FROM notifications WHERE user_id = $1 ORDER BY created_at DESC`;
    const result = await db.query(query, [userId]);
    return result.rows;
  }

  async findById(id: string): Promise<NotificationEntity | null> {
    const query = `SELECT * FROM notifications WHERE notification_id = $1`;
    const result = await db.query(query, [id]);
    return result.rows[0] || null;
  }

  async create(data: CreateNotificationDTO): Promise<NotificationEntity> {
    const id = uuidv4();
    const query = `
      INSERT INTO notifications (
        notification_id, user_id, title, description, severity, type, is_read, created_at
      ) VALUES (
        $1, $2, $3, $4, $5, $6, false, NOW()
      ) RETURNING *
    `;

    const values = [
      id,
      data.user_id,
      data.title,
      data.description,
      data.severity,
      data.type
    ];

    const result = await db.query(query, values);
    return result.rows[0];
  }

  async markAsRead(id: string): Promise<NotificationEntity | null> {
    const query = `
      UPDATE notifications 
      SET is_read = true 
      WHERE notification_id = $1 
      RETURNING *
    `;
    const result = await db.query(query, [id]);
    return result.rows[0] || null;
  }
}
