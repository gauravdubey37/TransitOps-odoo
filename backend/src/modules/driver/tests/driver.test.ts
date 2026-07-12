import { describe, it, expect, vi, beforeEach } from 'vitest';
import request from 'supertest';
import { app } from '../../../app';
import { DriverRepository } from '../repository';

describe('Driver API', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  describe('GET /api/v1/drivers', () => {
    it('should return all drivers', async () => {
      vi.spyOn(DriverRepository.prototype, 'findAll').mockResolvedValue([
        { driver_id: '123', first_name: 'John', last_name: 'Doe' } as any
      ]);

      const response = await request(app).get('/api/v1/drivers');
      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data).toHaveLength(1);
    });
  });

  describe('POST /api/v1/drivers', () => {
    it('should create a driver with valid payload', async () => {
      vi.spyOn(DriverRepository.prototype, 'findByEmployeeCode').mockResolvedValue(null);
      vi.spyOn(DriverRepository.prototype, 'create').mockResolvedValue({
        driver_id: '123',
        employee_code: 'EMP001',
        first_name: 'John'
      } as any);

      const response = await request(app)
        .post('/api/v1/drivers')
        .send({
          employee_code: 'EMP001',
          first_name: 'John',
          last_name: 'Doe',
          phone: '1234567890',
          joining_date: '2023-01-01',
          salary: 5000
        });

      expect(response.status).toBe(201);
      expect(response.body.success).toBe(true);
    });

    it('should fail with invalid payload (missing fields)', async () => {
      const response = await request(app)
        .post('/api/v1/drivers')
        .send({
          first_name: 'John' // Missing required fields
        });

      expect(response.status).toBe(400); // Validation error
      expect(response.body.success).toBe(false);
    });
  });
});

