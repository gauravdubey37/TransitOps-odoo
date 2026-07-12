import { describe, it, expect, vi, beforeEach } from 'vitest';
import request from 'supertest';
import { app } from '../../../app';
import { TripRepository } from '../repository';
import { DriverService } from '../../driver/service';
import { VehicleService } from '../../vehicle/service';
import { TRIP_STATUS } from '../constants';

vi.mock('../repository');
vi.mock('../../driver/service');
vi.mock('../../vehicle/service');

describe('Trip API', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  describe('GET /api/v1/trips', () => {
    it('should return all trips', async () => {
      TripRepository.prototype.findAll = vi.fn().mockResolvedValue([
        { trip_id: 't123', status: TRIP_STATUS.PLANNED }
      ]);

      const response = await request(app).get('/api/v1/trips');
      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data).toHaveLength(1);
    });
  });

  describe('POST /api/v1/trips', () => {
    const validPayload = {
      driver_id: 'b1424756-3c22-4a0b-8d8a-85d1d6a7f804',
      vehicle_id: 'c1424756-3c22-4a0b-8d8a-85d1d6a7f805',
      route_id: 'd1424756-3c22-4a0b-8d8a-85d1d6a7f806',
      planned_distance: 150,
      planned_duration: 120
    };

    it('should create a trip if validation passes', async () => {
      DriverService.prototype.isDriverAvailable = vi.fn().mockResolvedValue(true);
      VehicleService.prototype.isVehicleAvailable = vi.fn().mockResolvedValue(true);
      TripRepository.prototype.hasActiveTrip = vi.fn().mockResolvedValue(false);
      TripRepository.prototype.create = vi.fn().mockResolvedValue({
        trip_id: 't123',
        ...validPayload,
        status: TRIP_STATUS.PLANNED
      });

      const response = await request(app)
        .post('/api/v1/trips')
        .send(validPayload);

      expect(response.status).toBe(201);
      expect(response.body.success).toBe(true);
      expect(response.body.data.trip_id).toBe('t123');
    });

    it('should fail if driver is not available', async () => {
      DriverService.prototype.isDriverAvailable = vi.fn().mockResolvedValue(false);

      const response = await request(app)
        .post('/api/v1/trips')
        .send(validPayload);

      expect(response.status).toBe(422);
      expect(response.body.success).toBe(false);
      expect(response.body.message).toMatch(/Driver is either non-existent or unavailable/i);
    });

    it('should fail if vehicle is already in active trip', async () => {
      DriverService.prototype.isDriverAvailable = vi.fn().mockResolvedValue(true);
      VehicleService.prototype.isVehicleAvailable = vi.fn().mockResolvedValue(true);
      
      // Mock driver is NOT active, but vehicle IS active
      TripRepository.prototype.hasActiveTrip = vi.fn().mockImplementation((type) => {
         if (type === 'vehicle_id') return Promise.resolve(true);
         return Promise.resolve(false);
      });

      const response = await request(app)
        .post('/api/v1/trips')
        .send(validPayload);

      expect(response.status).toBe(422);
      expect(response.body.success).toBe(false);
      expect(response.body.message).toMatch(/Vehicle is already assigned to an active trip/i);
    });
  });
});
