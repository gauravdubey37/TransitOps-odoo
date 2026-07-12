import { RouteRepository } from './repository';
import { RouteEntity } from './types';
import { CreateRouteDTO, UpdateRouteDTO } from './dto';
import { DepotService } from '../depot/service';

export class RouteService {
  private repository: RouteRepository;
  private depotService: DepotService;

  constructor() {
    this.repository = new RouteRepository();
    this.depotService = new DepotService();
  }

  async getAllRoutes(): Promise<RouteEntity[]> {
    return this.repository.findAll();
  }

  async getRouteById(id: string): Promise<RouteEntity | null> {
    return this.repository.findById(id);
  }

  async createRoute(data: CreateRouteDTO): Promise<RouteEntity> {
    // 1. Check same source and destination
    if (data.source_depot_id === data.destination_depot_id) {
      throw { statusCode: 422, message: 'Source and destination depots cannot be the same' };
    }

    // 2. Check route code uniqueness
    const codeCheck = await this.repository.findByRouteCode(data.route_code);
    if (codeCheck) {
      throw { statusCode: 422, message: 'Route code already exists' };
    }

    // 3. Verify depots exist
    const sourceDepot = await this.depotService.getDepotById(data.source_depot_id);
    if (!sourceDepot) {
      throw { statusCode: 422, message: 'Source depot does not exist' };
    }

    const destinationDepot = await this.depotService.getDepotById(data.destination_depot_id);
    if (!destinationDepot) {
      throw { statusCode: 422, message: 'Destination depot does not exist' };
    }

    // 4. Check for duplicate exact route mapping
    const existingRoute = await this.repository.findBySourceAndDestination(data.source_depot_id, data.destination_depot_id);
    if (existingRoute) {
      throw { statusCode: 422, message: 'A route with this source and destination already exists' };
    }

    return this.repository.create(data);
  }

  async updateRoute(id: string, data: UpdateRouteDTO): Promise<RouteEntity> {
    const existing = await this.repository.findById(id);
    if (!existing) {
      throw { statusCode: 404, message: 'Route not found' };
    }

    if (data.route_code && data.route_code !== existing.route_code) {
      const codeCheck = await this.repository.findByRouteCode(data.route_code);
      if (codeCheck) {
        throw { statusCode: 422, message: 'Route code already exists' };
      }
    }

    if (data.source_depot_id || data.destination_depot_id) {
      const newSource = data.source_depot_id || existing.source_depot_id;
      const newDest = data.destination_depot_id || existing.destination_depot_id;

      if (newSource === newDest) {
        throw { statusCode: 422, message: 'Source and destination depots cannot be the same' };
      }

      if (newSource !== existing.source_depot_id || newDest !== existing.destination_depot_id) {
        const routeCheck = await this.repository.findBySourceAndDestination(newSource, newDest);
        if (routeCheck) {
          throw { statusCode: 422, message: 'A route with this source and destination already exists' };
        }
      }
      
      // Verify new depots exist if they are changing
      if (data.source_depot_id) {
        const sourceDepot = await this.depotService.getDepotById(data.source_depot_id);
        if (!sourceDepot) throw { statusCode: 422, message: 'Source depot does not exist' };
      }
      if (data.destination_depot_id) {
        const destinationDepot = await this.depotService.getDepotById(data.destination_depot_id);
        if (!destinationDepot) throw { statusCode: 422, message: 'Destination depot does not exist' };
      }
    }

    const updated = await this.repository.update(id, data);
    if (!updated) {
      throw { statusCode: 500, message: 'Failed to update route' };
    }

    return updated;
  }
}
