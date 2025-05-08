export interface AlertNotification {
  id: string;
  timestamp: string; // ISO date string
  title: string;
  summary: string;
  read: boolean;
  linkToDetails?: string; // e.g., /dashboard/ams/xyz?eventId=123
  severity?: 'info' | 'warning' | 'critical';
}
