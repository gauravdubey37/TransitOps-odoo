import { describe, it, expect, vi, beforeEach } from 'vitest';
import request from 'supertest';
import { app } from '../../../app';
import { DashboardRepository } from '../repository';

vi.mock('../../../middleware/auth.middleware', () => ({
  authMiddleware: (req: any, res: any, next: any) => {
    req.user = { userId: 'u123', email: 'admin@transitops.local', role: 'Administrator' };
    next();
  },
  requireRole: () => (req: any, res: any, next: any) => next()
}));

describe('Dashboard API', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  describe('GET /api/v1/dashboard', () => {
    it('should return executive KPIs successfully', async () => {
      // Mock the raw SQL query return object (pg typically returns strings for aggregates)
      vi.spyOn(DashboardRepository.prototype, 'getExecutiveKPIs').mockResolvedValue({
        fleet_size: '15',
        available_drivers: '10',
        available_vehicles: '12',
        trips_today: '5',
        active_trips: '2',
        maintenance_due: '1',
        fuel_cost: '240.50'
      });

      const response = await request(app).get('/api/v1/dashboard');
      
      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      
      const kpis = response.body.data.kpis;
      expect(kpis.fleet_size).toBe(15); // Assert numbers were parsed correctly
      expect(kpis.available_drivers).toBe(10);
      expect(kpis.fuel_cost).toBe(240.5);
      expect(kpis.carbon_emissions).toBe(0); // Assert mock fallback worked
    });
  });
});
