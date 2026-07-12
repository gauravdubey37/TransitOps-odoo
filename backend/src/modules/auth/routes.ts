import { Router } from 'express';
import { AuthController } from './controller';
import { authMiddleware } from '../../middleware/auth.middleware';

const router = Router();
const controller = new AuthController();

// Public routes
router.post('/login', controller.login);
router.post('/refresh', controller.refreshToken);

// Protected routes
router.use(authMiddleware);
router.post('/logout', controller.logout);
router.get('/me', controller.getCurrentUser);
router.post('/change-password', controller.changePassword);

export default router;
