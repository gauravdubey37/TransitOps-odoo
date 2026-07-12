import { Router } from 'express';
import { DepotController } from './controller';

const router = Router();
const controller = new DepotController();

router.get('/', controller.getAllDepots);
router.get('/:id', controller.getDepotById);
router.post('/', controller.createDepot);
router.patch('/:id', controller.updateDepot);

export default router;
