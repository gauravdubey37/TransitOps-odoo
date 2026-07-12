import { Router } from 'express';
import { UserController } from './controller';
import { authMiddleware, requireRole } from '../../middleware/auth.middleware';

const router = Router();
const controller = new UserController();

// MVP: Only administrators can manage users
router.use(authMiddleware);
router.use(requireRole(['Administrator']));

router.get('/', controller.getAllUsers);
router.get('/:id', controller.getUserById);
router.post('/', controller.createUser);
router.patch('/:id', controller.updateUser);

export default router;
