import { Request, Response, NextFunction } from 'express';
import { DashboardService } from './service';
import { sendSuccess } from '../../utils/response';

export class DashboardController {
  private service: DashboardService;

  constructor() {
    this.service = new DashboardService();
  }

  getExecutiveDashboard = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const dashboard = await this.service.getExecutiveDashboard();
      return sendSuccess(res, dashboard, 'Dashboard retrieved successfully');
    } catch (error) {
      next(error);
    }
  };
}
