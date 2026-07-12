import { describe, it, expect, vi, beforeEach } from 'vitest';
import request from 'supertest';
import { app } from '../../../app';
import { DepotRepository } from '../repository';

describe('Depot API', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  describe('GET /api/v1/depots', () => {
    it('should return all depots', async () => {
      vi.spyOn(DepotRepository.prototype, 'findAll').mockResolvedValue([
        { id: '123', code: 'D-MUM', name: 'Mumbai Depot' } as any
      ]);

      const response = await request(app).get('/api/v1/depots');
      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data).toHaveLength(1);
    });
  });

  describe('POST /api/v1/depots', () => {
    const validPayload = {
      name: 'Pune Depot',
      code: 'D-PUN',
      address: 'Pune Highway',
      city: 'Pune',
      state: 'Maharashtra',
    };

    it('should create a depot with valid payload', async () => {
      vi.spyOn(DepotRepository.prototype, 'findByCode').mockResolvedValue(null);
      vi.spyOn(DepotRepository.prototype, 'create').mockResolvedValue({
        id: '123',
        ...validPayload
      } as any);

      const response = await request(app)
        .post('/api/v1/depots')
        .send(validPayload);

      expect(response.status).toBe(201);
      expect(response.body.success).toBe(true);
      expect(response.body.data.id).toBe('123');
    });

    it('should fail if depot code already exists', async () => {
      vi.spyOn(DepotRepository.prototype, 'findByCode').mockResolvedValue({ id: '456' } as any);

      const response = await request(app)
        .post('/api/v1/depots')
        .send(validPayload);

      expect(response.status).toBe(422);
      expect(response.body.success).toBe(false);
      expect(response.body.message).toMatch(/already exists/i);
    });
  });
});
