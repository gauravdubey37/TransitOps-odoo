import { describe, it, expect, vi, beforeEach } from 'vitest';
import request from 'supertest';
import { app } from '../../../app';
import { FuelRepository } from '../repository';
import { VehicleService } from '../../vehicle/service';
import { DriverService } from '../../driver/service';

vi.mock('../../../middleware/auth.middleware', () => ({
  authMiddleware: (req: any, res: any, next: any) => {
    req.user = { userId: 'u123', email: 'admin@transitops.local', role: 'Administrator' };
    next();
  },
  requireRole: () => (req: any, res: any, next: any) => next()
}));

describe('Fuel API', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  const validPayload = {
    trip_id: '123e4567-e89b-12d3-a456-426614174000',
    driver_id: '223e4567-e89b-12d3-a456-426614174000',
    vehicle_id: '323e4567-e89b-12d3-a456-426614174000',
    quantity: 50.5,
    cost: 150.75,
    fuel_station: 'Station A',
    odometer: 15000,
  };

  describe('GET /api/v1/fuel', () => {
    it('should return all fuel logs', async () => {
      vi.spyOn(FuelRepository.prototype, 'findAll').mockResolvedValue([{ fuel_log_id: 'f1' } as any]);

      const response = await request(app).get('/api/v1/fuel');
      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data).toHaveLength(1);
    });
  });

  describe('POST /api/v1/fuel', () => {
    it('should create a fuel log if validation passes', async () => {
      vi.spyOn(VehicleService.prototype, 'getVehicleById').mockResolvedValue({ vehicle_id: validPayload.vehicle_id } as any);
      vi.spyOn(DriverService.prototype, 'getDriverById').mockResolvedValue({ driver_id: validPayload.driver_id } as any);
      vi.spyOn(FuelRepository.prototype, 'create').mockResolvedValue({ fuel_log_id: 'f123', ...validPayload } as any);

      const response = await request(app)
        .post('/api/v1/fuel')
        .send(validPayload);

      expect(response.status).toBe(201);
      expect(response.body.success).toBe(true);
      expect(response.body.data.fuel_log_id).toBe('f123');
    });

    it('should fail if vehicle does not exist', async () => {
      vi.spyOn(VehicleService.prototype, 'getVehicleById').mockResolvedValue(null);

      const response = await request(app)
        .post('/api/v1/fuel')
        .send(validPayload);

      expect(response.status).toBe(422);
      expect(response.body.message).toMatch(/Invalid vehicle ID/i);
    });

    it('should fail if driver does not exist', async () => {
      vi.spyOn(VehicleService.prototype, 'getVehicleById').mockResolvedValue({ vehicle_id: validPayload.vehicle_id } as any);
      vi.spyOn(DriverService.prototype, 'getDriverById').mockResolvedValue(null);

      const response = await request(app)
        .post('/api/v1/fuel')
        .send(validPayload);

      expect(response.status).toBe(422);
      expect(response.body.message).toMatch(/Invalid driver ID/i);
    });
    
    it('should fail validation if quantity is negative', async () => {
      const response = await request(app)
        .post('/api/v1/fuel')
        .send({ ...validPayload, quantity: -10 });

      expect(response.status).toBe(400); // Validation error
    });
  });
});
