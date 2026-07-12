import { TripRepository } from './repository';
import { CreateTripDTO, UpdateTripDTO } from './dto';
import { TripEntity } from './types';
import { AssignmentValidationService } from './assignment-validation.service';

export class TripService {
  private repository: TripRepository;
  private validationService: AssignmentValidationService;

  constructor() {
    this.repository = new TripRepository();
    this.validationService = new AssignmentValidationService();
  }

  async getAllTrips(): Promise<TripEntity[]> {
    return this.repository.findAll();
  }

  async getTripById(id: string): Promise<TripEntity | null> {
    return this.repository.findById(id);
  }

  async createTrip(data: CreateTripDTO): Promise<TripEntity> {
    // 1. Cross-module validation
    await this.validationService.validateAssignment(data.driver_id, data.vehicle_id);

    // 2. Create the trip
    return this.repository.create(data);
  }

  async updateTrip(id: string, data: UpdateTripDTO): Promise<TripEntity> {
    const trip = await this.repository.findById(id);
    if (!trip) {
      throw { statusCode: 404, message: 'Trip not found' };
    }

    const updated = await this.repository.update(id, data);
    if (!updated) {
      throw { statusCode: 500, message: 'Failed to update trip' };
    }

    return updated;
  }
}
