import { Request, Response, NextFunction } from 'express';
import { TripService } from './service';
import { sendSuccess } from '../../utils/response';
import { CreateTripSchema, UpdateTripSchema } from './validator';

export class TripController {
  private tripService: TripService;

  constructor() {
    this.tripService = new TripService();
  }

  getAllTrips = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const trips = await this.tripService.getAllTrips();
      return sendSuccess(res, trips, 'Trips retrieved successfully');
    } catch (error) {
      next(error);
    }
  };

  getTripById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const trip = await this.tripService.getTripById(id);
      
      if (!trip) {
        throw { statusCode: 404, message: 'Trip not found' };
      }
      
      return sendSuccess(res, trip, 'Trip retrieved successfully');
    } catch (error) {
      next(error);
    }
  };

  createTrip = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = CreateTripSchema.parse(req.body);
      const newTrip = await this.tripService.createTrip(data);
      return sendSuccess(res, newTrip, 'Trip created successfully', 201);
    } catch (error) {
      next(error);
    }
  };

  updateTrip = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const data = UpdateTripSchema.parse(req.body);
      const updatedTrip = await this.tripService.updateTrip(id, data);
      return sendSuccess(res, updatedTrip, 'Trip updated successfully');
    } catch (error) {
      next(error);
    }
  };
}
