import { describe, it, expect, vi, beforeEach } from 'vitest';
import request from 'supertest';
import { app } from '../../../app';
import { VehicleRepository } from '../repository';
import { VEHICLE_CLASS, FUEL_TYPE, VEHICLE_STATUS } from '../constants';


vi.mock('../../../middleware/auth.middleware', () => ({
  authMiddleware: (req: any, res: any, next: any) => {
    req.user = { userId: 'u123', email: 'test@test.com', role: 'Administrator' };
    next();
  },
  requireRole: () => (req: any, res: any, next: any) => next()
}));


describe('Vehicle API', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  describe('GET /api/v1/vehicles', () => {
    it('should return all vehicles', async () => {
      vi.spyOn(VehicleRepository.prototype, 'findAll').mockResolvedValue([
        { vehicle_id: 'v123', registration_number: 'MH-12-AB-1234' } as any
      ]);

      const response = await request(app).get('/api/v1/vehicles');
      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data).toHaveLength(1);
    });
  });

  describe('POST /api/v1/vehicles', () => {
    const validPayload = {
      registration_number: 'MH-12-AB-1234',
      vehicle_class: VEHICLE_CLASS.TRUCK,
      manufacturer: 'Tata',
      model: 'Prima',
      manufacturing_year: 2022,
      fuel_type: FUEL_TYPE.DIESEL,
      mileage: 4.5,
      load_capacity: 15000,
      current_odometer: 10000
    };

    it('should create a vehicle with valid payload', async () => {
      vi.spyOn(VehicleRepository.prototype, 'findByRegistration').mockResolvedValue(null);
      vi.spyOn(VehicleRepository.prototype, 'create').mockResolvedValue({
        vehicle_id: 'v123',
        ...validPayload,
        status: VEHICLE_STATUS.AVAILABLE
      } as any);

      const response = await request(app)
        .post('/api/v1/vehicles')
        .send(validPayload);

      expect(response.status).toBe(201);
      expect(response.body.success).toBe(true);
      expect(response.body.data.vehicle_id).toBe('v123');
    });

    it('should fail if registration number already exists', async () => {
      vi.spyOn(VehicleRepository.prototype, 'findByRegistration').mockResolvedValue({ vehicle_id: 'v456' } as any);

      const response = await request(app)
        .post('/api/v1/vehicles')
        .send(validPayload);

      expect(response.status).toBe(422);
      expect(response.body.success).toBe(false);
      expect(response.body.message).toMatch(/already exists/i);
    });

    it('should fail with invalid mileage (negative)', async () => {
      const response = await request(app)
        .post('/api/v1/vehicles')
        .send({ ...validPayload, mileage: -5 });

      expect(response.status).toBe(400); // Validation error
      expect(response.body.success).toBe(false);
      expect(response.body.errors[0].field).toBe('mileage');
    });
  });
});

