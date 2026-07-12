import { Request, Response, NextFunction } from 'express';
import { DriverService } from '../driver/service';
import { VehicleService } from '../vehicle/service';
import { TripService } from '../trip/service';
import { RouteService } from '../route/service';
import { FuelService } from '../fuel/service';
import { ExpenseService } from '../expense/service';
import { sendSuccess } from '../../utils/response';

export class AnalyticsController {
  private driverService = new DriverService();
  private vehicleService = new VehicleService();
  private tripService = new TripService();
  private routeService = new RouteService();
  private fuelService = new FuelService();
  private expenseService = new ExpenseService();

  // These endpoints safely alias the operational data for the Analytics Engine to consume
  
  getDriversForAnalytics = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await this.driverService.getAllDrivers();
      return sendSuccess(res, data, 'Analytics data retrieved');
    } catch (error) { next(error); }
  };

  getVehiclesForAnalytics = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await this.vehicleService.getAllVehicles();
      return sendSuccess(res, data, 'Analytics data retrieved');
    } catch (error) { next(error); }
  };

  getTripsForAnalytics = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await this.tripService.getAllTrips();
      return sendSuccess(res, data, 'Analytics data retrieved');
    } catch (error) { next(error); }
  };

  getRoutesForAnalytics = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await this.routeService.getAllRoutes();
      return sendSuccess(res, data, 'Analytics data retrieved');
    } catch (error) { next(error); }
  };

  getFuelForAnalytics = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await this.fuelService.getAllFuelLogs();
      return sendSuccess(res, data, 'Analytics data retrieved');
    } catch (error) { next(error); }
  };

  getExpensesForAnalytics = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await this.expenseService.getAllExpenses();
      return sendSuccess(res, data, 'Analytics data retrieved');
    } catch (error) { next(error); }
  };
}
