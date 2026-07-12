import { describe, it, expect, vi, beforeEach } from 'vitest';
import request from 'supertest';
import { app } from '../../../app';
import { RouteRepository } from '../repository';
import { DepotService } from '../../depot/service';
import { ROUTE_STATUS } from '../constants';

describe('Route API', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  describe('GET /api/v1/routes', () => {
    it('should return all routes', async () => {
      vi.spyOn(RouteRepository.prototype, 'findAll').mockResolvedValue([
        { id: '123', route_code: 'R001', status: ROUTE_STATUS.ACTIVE } as any
      ]);

      const response = await request(app).get('/api/v1/routes');
      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data).toHaveLength(1);
    });
  });

  describe('POST /api/v1/routes', () => {
    const validPayload = {
      route_code: 'R001',
      name: 'Mumbai to Pune',
      source_depot_id: '123e4567-e89b-12d3-a456-426614174000',
      destination_depot_id: '987fcdeb-51a2-43d7-9012-345678901234',
      distance_km: 150,
      estimated_duration_minutes: 180
    };

    it('should create a route if validation passes', async () => {
      vi.spyOn(RouteRepository.prototype, 'findByRouteCode').mockResolvedValue(null);
      vi.spyOn(RouteRepository.prototype, 'findBySourceAndDestination').mockResolvedValue(null);
      vi.spyOn(DepotService.prototype, 'getDepotById').mockResolvedValue({ id: 'dummy' } as any);
      vi.spyOn(RouteRepository.prototype, 'create').mockResolvedValue({
        id: 'r123',
        ...validPayload,
        status: ROUTE_STATUS.ACTIVE
      } as any);

      const response = await request(app)
        .post('/api/v1/routes')
        .send(validPayload);

      expect(response.status).toBe(201);
      expect(response.body.success).toBe(true);
      expect(response.body.data.id).toBe('r123');
    });

    it('should fail if source and destination are the same', async () => {
      const response = await request(app)
        .post('/api/v1/routes')
        .send({ ...validPayload, destination_depot_id: '123e4567-e89b-12d3-a456-426614174000' });

      expect(response.status).toBe(422);
      expect(response.body.success).toBe(false);
      expect(response.body.message).toMatch(/cannot be the same/i);
    });

    it('should fail if route code exists', async () => {
      vi.spyOn(RouteRepository.prototype, 'findByRouteCode').mockResolvedValue({ id: 'r999' } as any);

      const response = await request(app)
        .post('/api/v1/routes')
        .send(validPayload);

      expect(response.status).toBe(422);
      expect(response.body.success).toBe(false);
      expect(response.body.message).toMatch(/already exists/i);
    });
  });
});
