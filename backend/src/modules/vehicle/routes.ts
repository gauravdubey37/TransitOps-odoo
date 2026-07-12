import { Router } from 'express';
import { VehicleController } from './controller';

const router = Router();
const controller = new VehicleController();

router.get('/', controller.getAllVehicles);
router.get('/:id', controller.getVehicleById);
router.post('/', controller.createVehicle);
router.patch('/:id', controller.updateVehicle);
router.delete('/:id', controller.deleteVehicle);

export default router;
