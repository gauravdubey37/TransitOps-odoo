import { Router } from 'express';
import { TripController } from './controller';

const router = Router();
const controller = new TripController();

router.get('/', controller.getAllTrips);
router.get('/:id', controller.getTripById);
router.post('/', controller.createTrip);
router.patch('/:id', controller.updateTrip);

export default router;
