import { describe, it, expect, vi, beforeEach } from 'vitest';
import request from 'supertest';
import { app } from '../../../app';

vi.mock('../../../middleware/auth.middleware', () => ({
  authMiddleware: (req: any, res: any, next: any) => {
    req.user = { userId: 'u123', email: 'admin@transitops.local', role: 'Administrator' };
    next();
  },
  requireRole: () => (req: any, res: any, next: any) => next()
}));

// We don't need to mock the AnalyticsClient because the `getAnalyticsClient` function natively defaults to `MockAnalyticsClient` during tests unless ENV is set to 'http'.

describe('Voice API', () => {
  describe('POST /api/v1/voice/intent', () => {
    it('should return mocked intent successfully', async () => {
      const response = await request(app)
        .post('/api/v1/voice/intent')
        .send({ payload: 'Log $50 fuel for V-100' });
        
      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data.intent).toBe('LOG_FUEL');
      expect(response.body.data.entities.vehicle_id).toBe('V-100');
    });

    it('should fail if payload is missing', async () => {
      const response = await request(app)
        .post('/api/v1/voice/intent')
        .send({}); // Missing payload
        
      expect(response.status).toBe(400); // Zod validation
    });
  });

  describe('POST /api/v1/voice/confirm', () => {
    it('should confirm action successfully', async () => {
      const response = await request(app)
        .post('/api/v1/voice/confirm')
        .send({ intent: 'LOG_FUEL', data: {} });
        
      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data.success).toBe(true);
    });
  });

  describe('GET /api/v1/voice/tasks', () => {
    it('should return pending tasks', async () => {
      const response = await request(app).get('/api/v1/voice/tasks');
        
      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(Array.isArray(response.body.data)).toBe(true);
    });
  });

  describe('GET /api/v1/voice/status', () => {
    it('should return engine status', async () => {
      const response = await request(app).get('/api/v1/voice/status');
        
      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data.status).toBe('mock_online');
    });
  });
});
