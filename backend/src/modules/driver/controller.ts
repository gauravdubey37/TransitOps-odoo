import { Request, Response, NextFunction } from 'express';
import { DriverService } from './service';
import { sendSuccess } from '../../utils/response';
import { CreateDriverSchema, UpdateDriverSchema } from './validator';

export class DriverController {
  private driverService: DriverService;

  constructor() {
    this.driverService = new DriverService();
  }

  // Bind methods to preserve 'this' context
  getAllDrivers = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const drivers = await this.driverService.getAllDrivers();
      return sendSuccess(res, drivers, 'Drivers retrieved successfully');
    } catch (error) {
      next(error);
    }
  };

  getDriverById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const driver = await this.driverService.getDriverById(id);
      
      if (!driver) {
        throw { statusCode: 404, message: 'Driver not found' };
      }
      
      return sendSuccess(res, driver, 'Driver retrieved successfully');
    } catch (error) {
      next(error);
    }
  };

  createDriver = async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Validate request body
      const data = CreateDriverSchema.parse(req.body);
      
      const newDriver = await this.driverService.createDriver(data);
      return sendSuccess(res, newDriver, 'Driver created successfully', 201);
    } catch (error) {
      next(error);
    }
  };

  updateDriver = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      
      // Validate request body
      const data = UpdateDriverSchema.parse(req.body);
      
      const updatedDriver = await this.driverService.updateDriver(id, data);
      return sendSuccess(res, updatedDriver, 'Driver updated successfully');
    } catch (error) {
      next(error);
    }
  };

  deleteDriver = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      await this.driverService.deleteDriver(id);
      
      return sendSuccess(res, null, 'Driver deleted successfully', 200);
    } catch (error) {
      next(error);
    }
  };
}
