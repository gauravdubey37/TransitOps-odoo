export enum NotificationSeverity {
  Info = 'Info',
  Warning = 'Warning',
  Critical = 'Critical'
}

export enum NotificationType {
  Maintenance = 'Maintenance',
  Fatigue = 'Fatigue',
  System = 'System',
  Trip = 'Trip'
}

export interface NotificationEntity {
  notification_id: string; // UUID
  user_id: string; // UUID
  title: string;
  description: string;
  severity: NotificationSeverity;
  type: NotificationType;
  is_read: boolean;
  created_at: Date;
}
