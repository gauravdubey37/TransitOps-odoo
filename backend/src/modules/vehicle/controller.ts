import { Request, Response, NextFunction } from 'express';
import { VehicleService } from './service';
import { sendSuccess } from '../../utils/response';
import { CreateVehicleSchema, UpdateVehicleSchema } from './validator';

export class VehicleController {
  private vehicleService: VehicleService;

  constructor() {
    this.vehicleService = new VehicleService();
  }

  // Bind methods to preserve 'this' context
  getAllVehicles = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const vehicles = await this.vehicleService.getAllVehicles();
      return sendSuccess(res, vehicles, 'Vehicles retrieved successfully');
    } catch (error) {
      next(error);
    }
  };

  getVehicleById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const vehicle = await this.vehicleService.getVehicleById(id);
      
      if (!vehicle) {
        throw { statusCode: 404, message: 'Vehicle not found' };
      }
      
      return sendSuccess(res, vehicle, 'Vehicle retrieved successfully');
    } catch (error) {
      next(error);
    }
  };

  createVehicle = async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Validate request body
      const data = CreateVehicleSchema.parse(req.body);
      
      const newVehicle = await this.vehicleService.createVehicle(data);
      return sendSuccess(res, newVehicle, 'Vehicle created successfully', 201);
    } catch (error) {
      next(error);
    }
  };

  updateVehicle = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      
      // Validate request body
      const data = UpdateVehicleSchema.parse(req.body);
      
      const updatedVehicle = await this.vehicleService.updateVehicle(id, data);
      return sendSuccess(res, updatedVehicle, 'Vehicle updated successfully');
    } catch (error) {
      next(error);
    }
  };

  deleteVehicle = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      await this.vehicleService.deleteVehicle(id);
      
      return sendSuccess(res, null, 'Vehicle deleted successfully', 200);
    } catch (error) {
      next(error);
    }
  };
}
