import { Router } from 'express';
import { RouteController } from './controller';

const router = Router();
const controller = new RouteController();

router.get('/', controller.getAllRoutes);
router.get('/:id', controller.getRouteById);
router.post('/', controller.createRoute);
router.patch('/:id', controller.updateRoute);

export default router;
