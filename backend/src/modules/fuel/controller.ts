import { Request, Response, NextFunction } from 'express';
import { FuelService } from './service';
import { sendSuccess } from '../../utils/response';
import { CreateFuelLogSchema } from './validator';

export class FuelController {
  private service: FuelService;

  constructor() {
    this.service = new FuelService();
  }

  getAllFuelLogs = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const logs = await this.service.getAllFuelLogs();
      return sendSuccess(res, logs, 'Fuel logs retrieved successfully');
    } catch (error) {
      next(error);
    }
  };

  getFuelLogById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const log = await this.service.getFuelLogById(id);
      
      if (!log) {
        throw { statusCode: 404, message: 'Fuel log not found' };
      }
      
      return sendSuccess(res, log, 'Fuel log retrieved successfully');
    } catch (error) {
      next(error);
    }
  };

  getFuelLogsByVehicleId = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const logs = await this.service.getFuelLogsByVehicleId(id);
      return sendSuccess(res, logs, 'Vehicle fuel logs retrieved successfully');
    } catch (error) {
      next(error);
    }
  };

  createFuelLog = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = CreateFuelLogSchema.parse(req.body);
      const newLog = await this.service.createFuelLog(data);
      return sendSuccess(res, newLog, 'Fuel log created successfully', 201);
    } catch (error) {
      next(error);
    }
  };
}
