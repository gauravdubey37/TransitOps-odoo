import { Request, Response, NextFunction } from 'express';
import { RouteService } from './service';
import { sendSuccess } from '../../utils/response';
import { CreateRouteSchema, UpdateRouteSchema } from './validator';

export class RouteController {
  private service: RouteService;

  constructor() {
    this.service = new RouteService();
  }

  getAllRoutes = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const routes = await this.service.getAllRoutes();
      return sendSuccess(res, routes, 'Routes retrieved successfully');
    } catch (error) {
      next(error);
    }
  };

  getRouteById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const route = await this.service.getRouteById(id);
      
      if (!route) {
        throw { statusCode: 404, message: 'Route not found' };
      }
      
      return sendSuccess(res, route, 'Route retrieved successfully');
    } catch (error) {
      next(error);
    }
  };

  createRoute = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = CreateRouteSchema.parse(req.body);
      const newRoute = await this.service.createRoute(data);
      return sendSuccess(res, newRoute, 'Route created successfully', 201);
    } catch (error) {
      next(error);
    }
  };

  updateRoute = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const data = UpdateRouteSchema.parse(req.body);
      const updatedRoute = await this.service.updateRoute(id, data);
      return sendSuccess(res, updatedRoute, 'Route updated successfully');
    } catch (error) {
      next(error);
    }
  };
}
