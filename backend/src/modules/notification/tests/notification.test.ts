import { describe, it, expect, vi, beforeEach } from 'vitest';
import request from 'supertest';
import { app } from '../../../app';
import { NotificationRepository } from '../repository';
import { UserService } from '../../user/service';
import { NotificationSeverity, NotificationType } from '../types';

vi.mock('../../../middleware/auth.middleware', () => ({
  authMiddleware: (req: any, res: any, next: any) => {
    req.user = { userId: 'u123', email: 'admin@transitops.local', role: 'Administrator' };
    next();
  },
  requireRole: () => (req: any, res: any, next: any) => next()
}));

describe('Notification API', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  const validPayload = {
    user_id: '123e4567-e89b-12d3-a456-426614174000',
    title: 'Maintenance Alert',
    description: 'Vehicle V-100 needs oil change',
    severity: NotificationSeverity.Warning,
    type: NotificationType.Maintenance
  };

  describe('GET /api/v1/notifications', () => {
    it('should return all notifications for the authenticated user', async () => {
      vi.spyOn(NotificationRepository.prototype, 'findAllByUserId').mockResolvedValue([{ notification_id: 'n1' } as any]);

      const response = await request(app).get('/api/v1/notifications');
      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data).toHaveLength(1);
    });
  });

  describe('POST /api/v1/notifications', () => {
    it('should create a notification if validation passes', async () => {
      vi.spyOn(UserService.prototype, 'getUserById').mockResolvedValue({ user_id: validPayload.user_id } as any);
      vi.spyOn(NotificationRepository.prototype, 'create').mockResolvedValue({ notification_id: 'n123', ...validPayload } as any);

      const response = await request(app)
        .post('/api/v1/notifications')
        .send(validPayload);

      expect(response.status).toBe(201);
      expect(response.body.success).toBe(true);
      expect(response.body.data.notification_id).toBe('n123');
    });

    it('should fail if user does not exist', async () => {
      vi.spyOn(UserService.prototype, 'getUserById').mockResolvedValue(null);

      const response = await request(app)
        .post('/api/v1/notifications')
        .send(validPayload);

      expect(response.status).toBe(422);
      expect(response.body.message).toMatch(/Invalid user ID/i);
    });
  });

  describe('PATCH /api/v1/notifications/:id/read', () => {
    it('should mark a notification as read', async () => {
      vi.spyOn(NotificationRepository.prototype, 'markAsRead').mockResolvedValue({ notification_id: 'n123', is_read: true } as any);

      const response = await request(app).patch('/api/v1/notifications/n123/read');
      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data.is_read).toBe(true);
    });
  });
});
