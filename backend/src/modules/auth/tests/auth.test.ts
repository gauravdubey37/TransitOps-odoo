import { describe, it, expect, vi, beforeEach } from 'vitest';
import request from 'supertest';
import { app } from '../../../app';
import { UserRepository } from '../../user/repository';
import { UserService } from '../../user/service';
import bcrypt from 'bcrypt';

vi.mock('../../../middleware/auth.middleware', () => ({
  authMiddleware: (req: any, res: any, next: any) => {
    // For protected routes like /me
    req.user = { userId: 'u123', email: 'admin@transitops.local', role: 'Administrator' };
    next();
  },
  requireRole: () => (req: any, res: any, next: any) => next()
}));

describe('Auth API', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  describe('POST /api/v1/auth/login', () => {
    it('should login with valid credentials', async () => {
      const mockUser = {
        user_id: 'u123',
        email: 'admin@transitops.local',
        password_hash: 'hashedpassword',
        is_active: true,
        role_id: 'role-123'
      };

      vi.spyOn(UserRepository.prototype, 'findByEmail').mockResolvedValue(mockUser as any);
      vi.spyOn(bcrypt, 'compare').mockImplementation(async () => true);
      vi.spyOn(UserService.prototype, 'getRoleById').mockResolvedValue({ role_name: 'Administrator' } as any);

      const response = await request(app)
        .post('/api/v1/auth/login')
        .send({ email: 'admin@transitops.local', password: 'password' });

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data.accessToken).toBeDefined();
      expect(response.body.data.refreshToken).toBeDefined();
    });

    it('should fail with invalid credentials', async () => {
      const mockUser = {
        user_id: 'u123',
        email: 'admin@transitops.local',
        password_hash: 'hashedpassword',
        is_active: true
      };

      vi.spyOn(UserRepository.prototype, 'findByEmail').mockResolvedValue(mockUser as any);
      vi.spyOn(bcrypt, 'compare').mockImplementation(async () => false);

      const response = await request(app)
        .post('/api/v1/auth/login')
        .send({ email: 'admin@transitops.local', password: 'wrongpassword' });

      expect(response.status).toBe(401);
      expect(response.body.success).toBe(false);
    });
  });

  describe('GET /api/v1/auth/me', () => {
    it('should return current user', async () => {
      const response = await request(app).get('/api/v1/auth/me');
      
      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data.email).toBe('admin@transitops.local');
    });
  });
});
