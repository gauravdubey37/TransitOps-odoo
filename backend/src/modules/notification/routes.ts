import { Router } from 'express';
import { NotificationController } from './controller';

const router = Router();
const controller = new NotificationController();

router.get('/', controller.getNotificationsByUserId);
router.get('/user/:userId', controller.getNotificationsByUserId);
router.post('/', controller.createNotification);
router.patch('/:id/read', controller.markAsRead);

export default router;
