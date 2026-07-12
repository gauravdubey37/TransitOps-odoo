import { Router } from 'express';
import { DriverController } from './controller';

const router = Router();
const controller = new DriverController();

// Use explicit binding or arrow functions if not bound in the constructor
router.get('/', controller.getAllDrivers);
router.get('/:id', controller.getDriverById);
router.post('/', controller.createDriver);
router.patch('/:id', controller.updateDriver);
router.delete('/:id', controller.deleteDriver);

export default router;
