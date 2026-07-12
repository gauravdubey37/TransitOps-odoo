import { z } from 'zod';
import { NotificationSeverity, NotificationType } from './types';

export const CreateNotificationSchema = z.object({
  user_id: z.string().uuid("Valid user ID is required"),
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  severity: z.nativeEnum(NotificationSeverity, {
    errorMap: () => ({ message: "Invalid severity" }),
  }),
  type: z.nativeEnum(NotificationType, {
    errorMap: () => ({ message: "Invalid type" }),
  })
});
