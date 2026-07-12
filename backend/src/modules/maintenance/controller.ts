import { Request, Response, NextFunction } from 'express';
import { MaintenanceService } from './service';
import { sendSuccess } from '../../utils/response';
import { CreateMaintenanceSchema } from './validator';

export class MaintenanceController {
  private service: MaintenanceService;

  constructor() {
    this.service = new MaintenanceService();
  }

  getAllMaintenanceRecords = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const records = await this.service.getAllMaintenanceRecords();
      return sendSuccess(res, records, 'Maintenance records retrieved successfully');
    } catch (error) {
      next(error);
    }
  };

  getMaintenanceRecordById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const record = await this.service.getMaintenanceRecordById(id);
      
      if (!record) {
        throw { statusCode: 404, message: 'Maintenance record not found' };
      }
      
      return sendSuccess(res, record, 'Maintenance record retrieved successfully');
    } catch (error) {
      next(error);
    }
  };

  getMaintenanceRecordsByVehicleId = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const records = await this.service.getMaintenanceRecordsByVehicleId(id);
      return sendSuccess(res, records, 'Vehicle maintenance records retrieved successfully');
    } catch (error) {
      next(error);
    }
  };

  createMaintenanceRecord = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = CreateMaintenanceSchema.parse(req.body);
      const newRecord = await this.service.createMaintenanceRecord(data);
      return sendSuccess(res, newRecord, 'Maintenance record created successfully', 201);
    } catch (error) {
      next(error);
    }
  };
}
