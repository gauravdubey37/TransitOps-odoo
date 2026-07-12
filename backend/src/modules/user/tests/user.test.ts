import { describe, it, expect, vi, beforeEach } from 'vitest';
import request from 'supertest';
import { app } from '../../../app';
import { UserRepository } from '../repository';
import { UserService } from '../service';

// Mock auth middleware to bypass auth for tests
vi.mock('../../../middleware/auth.middleware', () => ({
  authMiddleware: (req: any, res: any, next: any) => {
    req.user = { userId: 'u123', email: 'admin@transitops.local', role: 'Administrator' };
    next();
  },
  requireRole: () => (req: any, res: any, next: any) => next()
}));

describe('User API', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  describe('GET /api/v1/users', () => {
    it('should return all users', async () => {
      vi.spyOn(UserRepository.prototype, 'findAll').mockResolvedValue([
        { user_id: '123', email: 'test@test.local', full_name: 'Test User' } as any
      ]);

      const response = await request(app).get('/api/v1/users');
      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data).toHaveLength(1);
    });
  });

  describe('POST /api/v1/users', () => {
    const validPayload = {
      full_name: 'New Admin',
      email: 'newadmin@transitops.local',
      password: 'password123',
      role_id: '123e4567-e89b-12d3-a456-426614174000',
    };

    it('should create a user', async () => {
      vi.spyOn(UserRepository.prototype, 'findByEmail').mockResolvedValue(null);
      vi.spyOn(UserService.prototype, 'getRoleById').mockResolvedValue({ role_id: '123e4567-e89b-12d3-a456-426614174000', role_name: 'Administrator' } as any);
      vi.spyOn(UserRepository.prototype, 'create').mockResolvedValue({
        user_id: 'u456',
        full_name: validPayload.full_name,
        email: validPayload.email,
        password_hash: 'hashed'
      } as any);

      const response = await request(app)
        .post('/api/v1/users')
        .send(validPayload);

      expect(response.status).toBe(201);
      expect(response.body.success).toBe(true);
      expect(response.body.data.user_id).toBe('u456');
      expect(response.body.data.password_hash).toBeUndefined(); // Should not return hash
    });
  });
});
