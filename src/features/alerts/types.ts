import { ProductType } from '@shared-types/product';

/**
 * Alert notification interface representing user notifications
 */
export interface AlertNotification {
  id: string;
  alertId: string;
  userId: string;
  title: string;
  message: string;
  alertType: ProductType;
  read: boolean;
  createdAt: string;
  severity: 'critical' | 'warning' | 'info';
  timestamp: string;
  summary: string;
  linkToDetails?: string;
}

/**
 * Alert configuration union type
 */
export type AlertConfigurationU = 
  | VTSAlertConfiguration
  | AMSAlertConfiguration
  | FTSAlertConfiguration
  | MaritimeAlertConfiguration
  | ReportComplianceConfiguration
  | ReportChronologyConfiguration
  | InvestigationConfiguration;

/**
 * Base alert configuration interface
 */
interface BaseAlertConfiguration {
  id: string;
  name: string;
}

/**
 * Vessel Tracking System alert configuration
 */
export interface VTSAlertConfiguration extends BaseAlertConfiguration {
  vesselIMOs: string[];
  trackingFrequency: 'hourly' | 'daily' | 'weekly';
  notificationMethod: 'email' | 'sms' | 'both';
}

/**
 * Area Monitoring System alert configuration
 */
export interface AMSAlertConfiguration extends BaseAlertConfiguration {
  areaName: string;
  coordinates: [number, number][];
  monitoringFrequency: 'hourly' | 'daily' | 'weekly';
  notificationMethod: 'email' | 'sms' | 'both';
}

/**
 * Fleet Tracking System alert configuration
 */
export interface FTSAlertConfiguration extends BaseAlertConfiguration {
  fleetId: string;
  trackingFrequency: 'hourly' | 'daily' | 'weekly';
  notificationMethod: 'email' | 'sms' | 'both';
}

/**
 * Maritime Alert configuration
 */
export interface MaritimeAlertConfiguration extends BaseAlertConfiguration {
  alertType: 'SHIP' | 'AREA' | 'SHIP_AND_AREA';
  vesselIMOs?: string[];
  shipCriteria?: string[];
  areaName?: string;
  coordinates?: [number, number][];
  areaCriteria?: string[];
  notificationMethod: 'email' | 'sms' | 'both';
  notes?: string;
}

/**
 * Report Compliance configuration
 */
export interface ReportComplianceConfiguration extends BaseAlertConfiguration {
  reportType: 'compliance';
  vesselIMOs: string[];
  complianceStandards: string[];
  reportFrequency: 'monthly' | 'quarterly' | 'annually';
}

/**
 * Report Chronology configuration
 */
export interface ReportChronologyConfiguration extends BaseAlertConfiguration {
  reportType: 'chronology';
  vesselIMOs: string[];
  timeframe: {
    startDate: string;
    endDate: string;
  };
  includePortCalls: boolean;
  includeBunkeringEvents: boolean;
}

/**
 * Investigation configuration
 */
export interface InvestigationConfiguration extends BaseAlertConfiguration {
  investigationType: 'vessel' | 'company' | 'incident';
  subjectIdentifier: string;
  timeframe: {
    startDate: string;
    endDate: string;
  };
  priority: 'low' | 'medium' | 'high';
  notes?: string;
}
