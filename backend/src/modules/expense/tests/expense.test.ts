import { describe, it, expect, vi, beforeEach } from 'vitest';
import request from 'supertest';
import { app } from '../../../app';
import { ExpenseRepository } from '../repository';
import { TripService } from '../../trip/service';
import { DriverService } from '../../driver/service';
import { ExpenseCategory } from '../types';

vi.mock('../../../middleware/auth.middleware', () => ({
  authMiddleware: (req: any, res: any, next: any) => {
    req.user = { userId: 'u123', email: 'admin@transitops.local', role: 'Administrator' };
    next();
  },
  requireRole: () => (req: any, res: any, next: any) => next()
}));

describe('Expense API', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  const validPayload = {
    trip_id: '123e4567-e89b-12d3-a456-426614174000',
    driver_id: '223e4567-e89b-12d3-a456-426614174000',
    category: ExpenseCategory.Toll,
    amount: 15.50,
    description: 'Highway Toll',
  };

  describe('GET /api/v1/expenses', () => {
    it('should return all expenses', async () => {
      vi.spyOn(ExpenseRepository.prototype, 'findAll').mockResolvedValue([{ expense_id: 'e1' } as any]);

      const response = await request(app).get('/api/v1/expenses');
      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data).toHaveLength(1);
    });
  });

  describe('POST /api/v1/expenses', () => {
    it('should create an expense if validation passes', async () => {
      vi.spyOn(TripService.prototype, 'getTripById').mockResolvedValue({ trip_id: validPayload.trip_id } as any);
      vi.spyOn(DriverService.prototype, 'getDriverById').mockResolvedValue({ driver_id: validPayload.driver_id } as any);
      vi.spyOn(ExpenseRepository.prototype, 'create').mockResolvedValue({ expense_id: 'e123', ...validPayload } as any);

      const response = await request(app)
        .post('/api/v1/expenses')
        .send(validPayload);

      expect(response.status).toBe(201);
      expect(response.body.success).toBe(true);
      expect(response.body.data.expense_id).toBe('e123');
    });

    it('should fail if trip does not exist', async () => {
      vi.spyOn(TripService.prototype, 'getTripById').mockResolvedValue(null);

      const response = await request(app)
        .post('/api/v1/expenses')
        .send(validPayload);

      expect(response.status).toBe(422);
      expect(response.body.message).toMatch(/Invalid trip ID/i);
    });
    
    it('should fail validation if category is invalid', async () => {
      const response = await request(app)
        .post('/api/v1/expenses')
        .send({ ...validPayload, category: 'InvalidCategory' });

      expect(response.status).toBe(400); // Validation error
    });
  });
});
