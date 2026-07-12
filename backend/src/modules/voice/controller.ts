import { Request, Response, NextFunction } from 'express';
import { analyticsClient } from '../../lib/analyticsClient';
import { sendSuccess } from '../../utils/response';
import { VoiceIntentSchema, VoiceConfirmSchema } from './validator';

export class VoiceController {
  
  parseIntent = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { payload } = VoiceIntentSchema.parse(req.body);
      
      // Abstracted call to the underlying Analytics/NLP provider
      const result = await analyticsClient.parseVoiceIntent(payload);
      
      return sendSuccess(res, result, 'Intent parsed successfully');
    } catch (error) {
      next(error);
    }
  };

  confirmAction = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { intent, data } = VoiceConfirmSchema.parse(req.body);
      
      const success = await analyticsClient.confirmVoiceAction(intent, data);
      
      return sendSuccess(res, { success }, 'Voice action confirmed');
    } catch (error) {
      next(error);
    }
  };

  getVoiceTasks = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const tasks = await analyticsClient.getVoiceTasks();
      return sendSuccess(res, tasks, 'Voice tasks retrieved successfully');
    } catch (error) {
      next(error);
    }
  };

  getStatus = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const status = await analyticsClient.getEngineStatus();
      return sendSuccess(res, status, 'NLP Engine status retrieved');
    } catch (error) {
      next(error);
    }
  };
}
