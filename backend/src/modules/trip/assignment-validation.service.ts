import { DriverService } from '../driver/service';
import { VehicleService } from '../vehicle/service';
import { TripRepository } from './repository';

export class AssignmentValidationService {
  private driverService: DriverService;
  private vehicleService: VehicleService;
  private tripRepository: TripRepository;

  constructor() {
    this.driverService = new DriverService();
    this.vehicleService = new VehicleService();
    this.tripRepository = new TripRepository();
  }

  async validateAssignment(driverId: string, vehicleId: string): Promise<void> {
    // 1. Verify Driver exists and is available
    const isDriverAvailable = await this.driverService.isDriverAvailable(driverId);
    if (!isDriverAvailable) {
      throw { statusCode: 422, message: 'Driver is either non-existent or unavailable' };
    }

    // 2. Verify Vehicle exists and is available
    const isVehicleAvailable = await this.vehicleService.isVehicleAvailable(vehicleId);
    if (!isVehicleAvailable) {
      throw { statusCode: 422, message: 'Vehicle is either non-existent or unavailable' };
    }

    // 3. Verify neither is already assigned to another active trip
    const hasActiveTripDriver = await this.tripRepository.hasActiveTrip('driver_id', driverId);
    if (hasActiveTripDriver) {
      throw { statusCode: 422, message: 'Driver is already assigned to an active trip' };
    }

    const hasActiveTripVehicle = await this.tripRepository.hasActiveTrip('vehicle_id', vehicleId);
    if (hasActiveTripVehicle) {
      throw { statusCode: 422, message: 'Vehicle is already assigned to an active trip' };
    }
  }
}
