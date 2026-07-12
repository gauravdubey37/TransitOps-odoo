import { Request, Response, NextFunction } from 'express';
import { DepotService } from './service';
import { sendSuccess } from '../../utils/response';
import { CreateDepotSchema, UpdateDepotSchema } from './validator';

export class DepotController {
  private service: DepotService;

  constructor() {
    this.service = new DepotService();
  }

  getAllDepots = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const depots = await this.service.getAllDepots();
      return sendSuccess(res, depots, 'Depots retrieved successfully');
    } catch (error) {
      next(error);
    }
  };

  getDepotById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const depot = await this.service.getDepotById(id);
      
      if (!depot) {
        throw { statusCode: 404, message: 'Depot not found' };
      }
      
      return sendSuccess(res, depot, 'Depot retrieved successfully');
    } catch (error) {
      next(error);
    }
  };

  createDepot = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = CreateDepotSchema.parse(req.body);
      const newDepot = await this.service.createDepot(data);
      return sendSuccess(res, newDepot, 'Depot created successfully', 201);
    } catch (error) {
      next(error);
    }
  };

  updateDepot = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const data = UpdateDepotSchema.parse(req.body);
      const updatedDepot = await this.service.updateDepot(id, data);
      return sendSuccess(res, updatedDepot, 'Depot updated successfully');
    } catch (error) {
      next(error);
    }
  };
}
