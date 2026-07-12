import { VehicleRepository } from './repository';
import { CreateVehicleDTO, UpdateVehicleDTO } from './dto';
import { VehicleEntity } from './types';

export class VehicleService {
  private repository: VehicleRepository;

  constructor() {
    this.repository = new VehicleRepository();
  }

  async getAllVehicles(): Promise<VehicleEntity[]> {
    return this.repository.findAll();
  }

  async getVehicleById(id: string): Promise<VehicleEntity | null> {
    return this.repository.findById(id);
  }

  async createVehicle(data: CreateVehicleDTO): Promise<VehicleEntity> {
    // Business Rule: Ensure registration number is unique
    const existingVehicle = await this.repository.findByRegistration(data.registration_number);
    if (existingVehicle) {
      throw { statusCode: 422, message: 'Vehicle with this registration number already exists' };
    }

    return this.repository.create(data);
  }

  async updateVehicle(id: string, data: UpdateVehicleDTO): Promise<VehicleEntity> {
    const vehicle = await this.repository.findById(id);
    if (!vehicle) {
      throw { statusCode: 404, message: 'Vehicle not found' };
    }

    // Business Rule: If updating registration number, ensure it's not taken
    if (data.registration_number && data.registration_number !== vehicle.registration_number) {
      const existingVehicle = await this.repository.findByRegistration(data.registration_number);
      if (existingVehicle) {
        throw { statusCode: 422, message: 'Vehicle with this registration number already exists' };
      }
    }

    const updated = await this.repository.update(id, data);
    if (!updated) {
      throw { statusCode: 500, message: 'Failed to update vehicle' };
    }

    return updated;
  }

  async deleteVehicle(id: string): Promise<void> {
    const vehicle = await this.repository.findById(id);
    if (!vehicle) {
      throw { statusCode: 404, message: 'Vehicle not found' };
    }

    // Business Rule: Validate vehicle is not currently assigned or in transit before deleting
    if (vehicle.status !== 'Available' && vehicle.status !== 'Retired' && vehicle.status !== 'Inactive') {
       throw { statusCode: 422, message: 'Cannot delete vehicle currently assigned or in transit' };
    }

    const success = await this.repository.delete(id);
    if (!success) {
      throw { statusCode: 500, message: 'Failed to delete vehicle' };
    }
  }
}
