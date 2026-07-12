import { Router } from 'express';
import { DashboardController } from './controller';

const router = Router();
const controller = new DashboardController();

// Target <500ms API
router.get('/', controller.getExecutiveDashboard);

export default router;
