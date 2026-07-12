import { DriverRepository } from './repository';
import { CreateDriverDTO, UpdateDriverDTO } from './dto';
import { DriverEntity } from './types';

export class DriverService {
  private repository: DriverRepository;

  constructor() {
    this.repository = new DriverRepository();
  }

  async getAllDrivers(): Promise<DriverEntity[]> {
    return this.repository.findAll();
  }

  async getDriverById(id: string): Promise<DriverEntity | null> {
    return this.repository.findById(id);
  }

  async isDriverAvailable(id: string): Promise<boolean> {
    const driver = await this.getDriverById(id);
    if (!driver) return false;
    return driver.driver_status === 'Available';
  }

  async createDriver(data: CreateDriverDTO): Promise<DriverEntity> {
    // Business Rule: Ensure employee code is unique
    const existingDriver = await this.repository.findByEmployeeCode(data.employee_code);
    if (existingDriver) {
      throw { statusCode: 422, message: 'Driver with this employee code already exists' };
    }

    // Additional validations like license check could be added here
    return this.repository.create(data);
  }

  async updateDriver(id: string, data: UpdateDriverDTO): Promise<DriverEntity> {
    const driver = await this.repository.findById(id);
    if (!driver) {
      throw { statusCode: 404, message: 'Driver not found' };
    }

    const updated = await this.repository.update(id, data);
    if (!updated) {
      throw { statusCode: 500, message: 'Failed to update driver' };
    }

    return updated;
  }

  async deleteDriver(id: string): Promise<void> {
    const driver = await this.repository.findById(id);
    if (!driver) {
      throw { statusCode: 404, message: 'Driver not found' };
    }

    // Business Rule: Validate driver is not currently assigned before deleting
    if (driver.driver_status !== 'Available' && driver.driver_status !== 'Inactive' && driver.driver_status !== 'Off Duty') {
       throw { statusCode: 422, message: 'Cannot delete driver currently assigned or on duty' };
    }

    const success = await this.repository.delete(id);
    if (!success) {
      throw { statusCode: 500, message: 'Failed to delete driver' };
    }
  }
}
