import { Router } from 'express';
import { AnalyticsController } from './controller';

const router = Router();
const controller = new AnalyticsController();

router.get('/drivers', controller.getDriversForAnalytics);
router.get('/vehicles', controller.getVehiclesForAnalytics);
router.get('/trips', controller.getTripsForAnalytics);
router.get('/routes', controller.getRoutesForAnalytics);
router.get('/fuel', controller.getFuelForAnalytics);
router.get('/expenses', controller.getExpensesForAnalytics);

export default router;
