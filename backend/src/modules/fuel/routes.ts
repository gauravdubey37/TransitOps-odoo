import { Router } from 'express';
import { FuelController } from './controller';

const router = Router();
const controller = new FuelController();

router.get('/', controller.getAllFuelLogs);
router.get('/:id', controller.getFuelLogById);
router.post('/', controller.createFuelLog);

// A nested route /vehicles/:id/fuel could be implemented in the vehicle routes,
// but we will expose it here as well for flexibility.
router.get('/vehicle/:id', controller.getFuelLogsByVehicleId);

export default router;
