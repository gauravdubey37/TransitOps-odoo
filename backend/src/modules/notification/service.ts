import { NotificationRepository } from './repository';
import { NotificationEntity } from './types';
import { CreateNotificationDTO } from './dto';
import { UserService } from '../user/service';

export class NotificationService {
  private repository: NotificationRepository;
  private userService: UserService;

  constructor() {
    this.repository = new NotificationRepository();
    this.userService = new UserService();
  }

  async getNotificationsByUserId(userId: string): Promise<NotificationEntity[]> {
    return this.repository.findAllByUserId(userId);
  }

  async getNotificationById(id: string): Promise<NotificationEntity | null> {
    return this.repository.findById(id);
  }

  async createNotification(data: CreateNotificationDTO): Promise<NotificationEntity> {
    const user = await this.userService.getUserById(data.user_id);
    if (!user) {
      throw { statusCode: 422, message: 'Invalid user ID' };
    }

    return this.repository.create(data);
  }

  async markAsRead(id: string): Promise<NotificationEntity | null> {
    return this.repository.markAsRead(id);
  }
}
