import { describe, it, expect, vi, beforeEach } from 'vitest';
import request from 'supertest';
import { app } from '../../../app';
import { DriverService } from '../../driver/service';
import { VehicleService } from '../../vehicle/service';

vi.mock('../../../middleware/auth.middleware', () => ({
  authMiddleware: (req: any, res: any, next: any) => {
    req.user = { userId: 'u123', email: 'admin@transitops.local', role: 'Administrator' };
    next();
  },
  requireRole: () => (req: any, res: any, next: any) => next()
}));

describe('Analytics Integration API', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  describe('GET /api/v1/analytics/drivers', () => {
    it('should alias DriverService successfully', async () => {
      vi.spyOn(DriverService.prototype, 'getAllDrivers').mockResolvedValue([{ driver_id: 'd1' } as any]);

      const response = await request(app).get('/api/v1/analytics/drivers');
      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data).toHaveLength(1);
    });
  });

  describe('GET /api/v1/analytics/vehicles', () => {
    it('should alias VehicleService successfully', async () => {
      vi.spyOn(VehicleService.prototype, 'getAllVehicles').mockResolvedValue([{ vehicle_id: 'v1' } as any]);

      const response = await request(app).get('/api/v1/analytics/vehicles');
      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data).toHaveLength(1);
    });
  });
  
  // Test confirms the pattern works. We don't need to test every single alias endpoint because they use the exact same pattern.
});
