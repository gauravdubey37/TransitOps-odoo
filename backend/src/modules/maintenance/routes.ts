import { Router } from 'express';
import { MaintenanceController } from './controller';

const router = Router();
const controller = new MaintenanceController();

router.get('/', controller.getAllMaintenanceRecords);
router.get('/:id', controller.getMaintenanceRecordById);
router.post('/', controller.createMaintenanceRecord);

router.get('/vehicle/:id', controller.getMaintenanceRecordsByVehicleId);

export default router;
