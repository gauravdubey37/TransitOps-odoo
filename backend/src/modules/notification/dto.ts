import { z } from 'zod';
import { CreateNotificationSchema } from './validator';

export type CreateNotificationDTO = z.infer<typeof CreateNotificationSchema>;
