import { DepotRepository } from './repository';
import { DepotEntity } from './types';
import { CreateDepotDTO, UpdateDepotDTO } from './dto';

export class DepotService {
  private repository: DepotRepository;

  constructor() {
    this.repository = new DepotRepository();
  }

  async getAllDepots(): Promise<DepotEntity[]> {
    return this.repository.findAll();
  }

  async getDepotById(id: string): Promise<DepotEntity | null> {
    return this.repository.findById(id);
  }

  async createDepot(data: CreateDepotDTO): Promise<DepotEntity> {
    const existing = await this.repository.findByCode(data.code);
    if (existing) {
      throw { statusCode: 422, message: 'Depot with this code already exists' };
    }
    return this.repository.create(data);
  }

  async updateDepot(id: string, data: UpdateDepotDTO): Promise<DepotEntity> {
    const existing = await this.repository.findById(id);
    if (!existing) {
      throw { statusCode: 404, message: 'Depot not found' };
    }

    if (data.code && data.code !== existing.code) {
      const codeCheck = await this.repository.findByCode(data.code);
      if (codeCheck) {
        throw { statusCode: 422, message: 'Depot with this code already exists' };
      }
    }

    const updated = await this.repository.update(id, data);
    if (!updated) {
      throw { statusCode: 500, message: 'Failed to update depot' };
    }
    return updated;
  }
}
