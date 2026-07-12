import { describe, it, expect, vi, beforeEach } from 'vitest';
import request from 'supertest';
import { app } from '../../../app';
import { TripRepository } from '../repository';
import { DriverService } from '../../driver/service';
import { VehicleService } from '../../vehicle/service';
import { TRIP_STATUS } from '../constants';

describe('Trip API', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  describe('GET /api/v1/trips', () => {
    it('should return all trips', async () => {
      vi.spyOn(TripRepository.prototype, 'findAll').mockResolvedValue([
        { trip_id: 't123', status: TRIP_STATUS.PLANNED } as any
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
      vi.spyOn(DriverService.prototype, 'isDriverAvailable').mockResolvedValue(true);
      vi.spyOn(VehicleService.prototype, 'isVehicleAvailable').mockResolvedValue(true);
      vi.spyOn(TripRepository.prototype, 'hasActiveTrip').mockResolvedValue(false);
      vi.spyOn(TripRepository.prototype, 'create').mockResolvedValue({
        trip_id: 't123',
        ...validPayload,
        status: TRIP_STATUS.PLANNED
      } as any);

      const response = await request(app)
        .post('/api/v1/trips')
        .send(validPayload);

      expect(response.status).toBe(201);
      expect(response.body.success).toBe(true);
      expect(response.body.data.trip_id).toBe('t123');
    });

    it('should fail if driver is not available', async () => {
      vi.spyOn(DriverService.prototype, 'isDriverAvailable').mockResolvedValue(false);
      vi.spyOn(VehicleService.prototype, 'isVehicleAvailable').mockResolvedValue(true);

      const response = await request(app)
        .post('/api/v1/trips')
        .send(validPayload);

      expect(response.status).toBe(422);
      expect(response.body.success).toBe(false);
      expect(response.body.message).toMatch(/Driver is either non-existent or unavailable/i);
    });

    it('should fail if vehicle is already in active trip', async () => {
      vi.spyOn(DriverService.prototype, 'isDriverAvailable').mockResolvedValue(true);
      vi.spyOn(VehicleService.prototype, 'isVehicleAvailable').mockResolvedValue(true);
      
      // Mock driver is NOT active, but vehicle IS active
      vi.spyOn(TripRepository.prototype, 'hasActiveTrip').mockImplementation(async (type) => {
         if (type === 'vehicle_id') return true;
         return false;
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

