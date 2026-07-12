import { Request, Response, NextFunction } from 'express';
import { NotificationService } from './service';
import { sendSuccess } from '../../utils/response';
import { CreateNotificationSchema } from './validator';

export class NotificationController {
  private service: NotificationService;

  constructor() {
    this.service = new NotificationService();
  }

  getNotificationsByUserId = async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Typically we'd use req.user.userId, but for MVP flexibility we can take it from params or fall back to req.user
      const userId = req.params.userId || req.user?.userId;
      
      if (!userId) {
        throw { statusCode: 400, message: 'User ID is required' };
      }

      const notifications = await this.service.getNotificationsByUserId(userId);
      return sendSuccess(res, notifications, 'Notifications retrieved successfully');
    } catch (error) {
      next(error);
    }
  };

  createNotification = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = CreateNotificationSchema.parse(req.body);
      const newNotification = await this.service.createNotification(data);
      return sendSuccess(res, newNotification, 'Notification created successfully', 201);
    } catch (error) {
      next(error);
    }
  };

  markAsRead = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const updatedNotification = await this.service.markAsRead(id);
      
      if (!updatedNotification) {
        throw { statusCode: 404, message: 'Notification not found' };
      }
      
      return sendSuccess(res, updatedNotification, 'Notification marked as read');
    } catch (error) {
      next(error);
    }
  };
}
