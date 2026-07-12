import { ExpenseRepository } from './repository';
import { TripExpenseEntity } from './types';
import { CreateExpenseDTO } from './dto';
import { DriverService } from '../driver/service';
import { TripService } from '../trip/service';

export class ExpenseService {
  private repository: ExpenseRepository;
  private driverService: DriverService;
  private tripService: TripService;

  constructor() {
    this.repository = new ExpenseRepository();
    this.driverService = new DriverService();
    this.tripService = new TripService();
  }

  async getAllExpenses(): Promise<TripExpenseEntity[]> {
    return this.repository.findAll();
  }

  async getExpenseById(id: string): Promise<TripExpenseEntity | null> {
    return this.repository.findById(id);
  }

  async getExpensesByTripId(tripId: string): Promise<TripExpenseEntity[]> {
    return this.repository.findByTripId(tripId);
  }

  async createExpense(data: CreateExpenseDTO): Promise<TripExpenseEntity> {
    const trip = await this.tripService.getTripById(data.trip_id);
    if (!trip) {
      throw { statusCode: 422, message: 'Invalid trip ID' };
    }

    const driver = await this.driverService.getDriverById(data.driver_id);
    if (!driver) {
      throw { statusCode: 422, message: 'Invalid driver ID' };
    }

    return this.repository.create(data);
  }
}
