import { Router } from 'express';
import { VoiceController } from './controller';

const router = Router();
const controller = new VoiceController();

router.post('/intent', controller.parseIntent);
router.post('/confirm', controller.confirmAction);
router.get('/tasks', controller.getVoiceTasks);
router.get('/status', controller.getStatus);

export default router;
