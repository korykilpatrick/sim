import { Geometry } from 'geojson'; // Import GeoJSON type

/**
 * Base interface for all alert configurations
 * Ensures 'alertType' field for discrimination
 */
interface BaseAlertConfiguration {
  alertType: string;
}

/**
 * Configuration for Vessel Tracking Service Alerts
 */
export interface VTSAlertConfiguration extends BaseAlertConfiguration {
  alertType: 'VTS';
  trackingDurationDays: number;
  selectedCriteria: string[]; // e.g., ['AIS_REPORTING_6HR', 'DARK_EVENT']
  vesselIMOs: string[];
}

/**
 * Configuration for Area Monitoring Service Alerts
 */
export interface AMSAlertConfiguration extends BaseAlertConfiguration {
  alertType: 'AMS';
  monitoringDurationDays: number;
  aoiDefinition: Geometry; // Use GeoJSON Geometry type
  selectedCriteria: string[]; // e.g., ['VESSEL_ENTRY', 'VESSEL_EXIT']
  updateFrequencyHours: 6 | 12 | 24;
}

/**
 * Configuration for Fleet Tracking Service Alerts
 */
export interface FTSAlertConfiguration extends BaseAlertConfiguration {
  alertType: 'FTS';
  fleetName: string;
  vessels: string[]; // IMO numbers
  monitoringDurationDays: number;
  selectedCriteria: string[];
}

/**
 * Configuration for Report Compliance Alerts
 */
export interface ReportComplianceAlertConfiguration extends BaseAlertConfiguration {
  alertType: 'REPORT_COMPLIANCE';
  vesselIMO: string;
  timeframeStart: string; // ISO date string
  timeframeEnd: string; // ISO date string
  depth: 'basic' | 'standard' | 'comprehensive';
}

/**
 * Configuration for Report Chronology Alerts
 */
export interface ReportChronologyAlertConfiguration extends BaseAlertConfiguration {
  alertType: 'REPORT_CHRONOLOGY';
  vesselIMO: string;
  timeframeStart: string; // ISO date string
  timeframeEnd: string; // ISO date string
  depth: 'basic' | 'standard' | 'comprehensive';
}

/**
 * Configuration for Investigation Alerts
 */
export interface InvestigationAlertConfiguration extends BaseAlertConfiguration {
  alertType: 'INVESTIGATION';
  investigationType: string; // e.g., 'Vessel Anomaly', 'Port Activity'
  vesselIMO?: string;
  region?: string; // Could be a name or GeoJSON
  timeframe?: {
    start: string; // ISO date string
    end: string; // ISO date string
  };
  additionalInfo?: string;
}

/**
 * Configuration for Maritime Alerts (generic product type for custom alerts)
 */
export interface MaritimeAlertConfiguration extends BaseAlertConfiguration {
  alertType: 'MARITIME_ALERT';
  // Specific type of maritime alert being configured
  maritimeAlertType: 'SHIP' | 'AREA' | 'SHIP_AND_AREA';
  selectedCriteria: string[]; // Common criteria applicable

  // Fields relevant for 'SHIP' or 'SHIP_AND_AREA'
  vesselIMOs?: string[];

  // Fields relevant for 'AREA' or 'SHIP_AND_AREA'
  aoiDefinition?: Geometry; // Use GeoJSON Geometry type (optional here)
  monitoringDurationDays?: number;
  updateFrequencyHours?: 6 | 12 | 24;

  // You might add other specific fields based on maritimeAlertType
  customRuleName?: string; // User-defined name for this specific alert rule
}

/**
 * Discriminated union for all possible alert configuration types
 * Used for type narrowing with alert configuration details.
 * This type is used for the core alert configuration data model.
 */
export type AlertConfigurationType =
  | VTSAlertConfiguration
  | AMSAlertConfiguration
  | FTSAlertConfiguration
  | ReportComplianceAlertConfiguration
  | ReportChronologyAlertConfiguration
  | InvestigationAlertConfiguration
  | MaritimeAlertConfiguration;

/**
 * Legacy type name - kept for backward compatibility
 * @deprecated Use AlertConfigurationType instead
 */
export type AlertConfigurationU = AlertConfigurationType;