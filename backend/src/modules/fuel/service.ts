import { FuelRepository } from './repository';
import { FuelLogEntity } from './types';
import { CreateFuelLogDTO } from './dto';
import { DriverService } from '../driver/service';
import { VehicleService } from '../vehicle/service';

export class FuelService {
  private repository: FuelRepository;
  private driverService: DriverService;
  private vehicleService: VehicleService;

  constructor() {
    this.repository = new FuelRepository();
    this.driverService = new DriverService();
    this.vehicleService = new VehicleService();
  }

  async getAllFuelLogs(): Promise<FuelLogEntity[]> {
    return this.repository.findAll();
  }

  async getFuelLogById(id: string): Promise<FuelLogEntity | null> {
    return this.repository.findById(id);
  }

  async getFuelLogsByVehicleId(vehicleId: string): Promise<FuelLogEntity[]> {
    return this.repository.findByVehicleId(vehicleId);
  }

  async getFuelLogsByTripId(tripId: string): Promise<FuelLogEntity[]> {
    return this.repository.findByTripId(tripId);
  }

  async createFuelLog(data: CreateFuelLogDTO): Promise<FuelLogEntity> {
    const vehicle = await this.vehicleService.getVehicleById(data.vehicle_id);
    if (!vehicle) {
      throw { statusCode: 422, message: 'Invalid vehicle ID' };
    }

    const driver = await this.driverService.getDriverById(data.driver_id);
    if (!driver) {
      throw { statusCode: 422, message: 'Invalid driver ID' };
    }

    // In a real application, you might also validate if the trip exists if trip_id is provided,
    // but the schema says trip_id is optional. We will trust it or let DB handle FK violation.
    
    return this.repository.create(data);
  }
}
