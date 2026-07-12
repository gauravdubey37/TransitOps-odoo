import { MaintenanceRepository } from './repository';
import { MaintenanceRecordEntity } from './types';
import { CreateMaintenanceDTO } from './dto';
import { VehicleService } from '../vehicle/service';

export class MaintenanceService {
  private repository: MaintenanceRepository;
  private vehicleService: VehicleService;

  constructor() {
    this.repository = new MaintenanceRepository();
    this.vehicleService = new VehicleService();
  }

  async getAllMaintenanceRecords(): Promise<MaintenanceRecordEntity[]> {
    return this.repository.findAll();
  }

  async getMaintenanceRecordById(id: string): Promise<MaintenanceRecordEntity | null> {
    return this.repository.findById(id);
  }

  async getMaintenanceRecordsByVehicleId(vehicleId: string): Promise<MaintenanceRecordEntity[]> {
    return this.repository.findByVehicleId(vehicleId);
  }

  async createMaintenanceRecord(data: CreateMaintenanceDTO): Promise<MaintenanceRecordEntity> {
    const vehicle = await this.vehicleService.getVehicleById(data.vehicle_id);
    if (!vehicle) {
      throw { statusCode: 422, message: 'Invalid vehicle ID' };
    }

    return this.repository.create(data);
  }
}
