import { describe, it, expect, vi, beforeEach } from 'vitest';
import request from 'supertest';
import { app } from '../../../app';
import { MaintenanceRepository } from '../repository';
import { VehicleService } from '../../vehicle/service';
import { MaintenanceServiceType } from '../types';

vi.mock('../../../middleware/auth.middleware', () => ({
  authMiddleware: (req: any, res: any, next: any) => {
    req.user = { userId: 'u123', email: 'admin@transitops.local', role: 'Administrator' };
    next();
  },
  requireRole: () => (req: any, res: any, next: any) => next()
}));

describe('Maintenance API', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  const validPayload = {
    vehicle_id: '323e4567-e89b-12d3-a456-426614174000',
    service_type: MaintenanceServiceType.Repair,
    service_date: new Date().toISOString(),
    workshop: 'Metro Motors',
    cost: 5000.50,
    odometer: 45000,
    remarks: 'Brake pad replacement'
  };

  describe('GET /api/v1/maintenance', () => {
    it('should return all maintenance records', async () => {
      vi.spyOn(MaintenanceRepository.prototype, 'findAll').mockResolvedValue([{ maintenance_id: 'm1' } as any]);

      const response = await request(app).get('/api/v1/maintenance');
      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data).toHaveLength(1);
    });
  });

  describe('POST /api/v1/maintenance', () => {
    it('should create a maintenance record if validation passes', async () => {
      vi.spyOn(VehicleService.prototype, 'getVehicleById').mockResolvedValue({ vehicle_id: validPayload.vehicle_id } as any);
      vi.spyOn(MaintenanceRepository.prototype, 'create').mockResolvedValue({ maintenance_id: 'm123', ...validPayload } as any);

      const response = await request(app)
        .post('/api/v1/maintenance')
        .send(validPayload);

      expect(response.status).toBe(201);
      expect(response.body.success).toBe(true);
      expect(response.body.data.maintenance_id).toBe('m123');
    });

    it('should fail if vehicle does not exist', async () => {
      vi.spyOn(VehicleService.prototype, 'getVehicleById').mockResolvedValue(null);

      const response = await request(app)
        .post('/api/v1/maintenance')
        .send(validPayload);

      expect(response.status).toBe(422);
      expect(response.body.message).toMatch(/Invalid vehicle ID/i);
    });
    
    it('should fail validation if cost is negative', async () => {
      const response = await request(app)
        .post('/api/v1/maintenance')
        .send({ ...validPayload, cost: -500 });

      expect(response.status).toBe(400); // Validation error
    });
  });
});
