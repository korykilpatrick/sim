import { Geometry } from 'geojson'; // Import GeoJSON type

// Configuration for Vessel Tracking Service Alerts
export interface VTSAlertConfiguration {
  alertType: 'VTS';
  trackingDurationDays: number;
  selectedCriteria: string[]; // e.g., ['AIS_REPORTING_6HR', 'DARK_EVENT']
  vesselIMOs: string[];
}

// Configuration for Area Monitoring Service Alerts
export interface AMSAlertConfiguration {
  alertType: 'AMS';
  monitoringDurationDays: number;
  aoiDefinition: Geometry; // Use GeoJSON Geometry type
  selectedCriteria: string[]; // e.g., ['VESSEL_ENTRY', 'VESSEL_EXIT']
  updateFrequencyHours: 6 | 12 | 24;
}

// Configuration for Fleet Tracking Service Alerts
export interface FTSAlertConfiguration {
  alertType: 'FTS';
  fleetName: string;
  vessels: string[]; // IMO numbers
  monitoringDurationDays: number;
  selectedCriteria: string[];
}

// Configuration for Report Compliance Alerts
export interface ReportComplianceAlertConfiguration {
  alertType: 'REPORT_COMPLIANCE';
  vesselIMO: string;
  timeframeStart: string; // ISO date string
  timeframeEnd: string; // ISO date string
  depth: 'basic' | 'standard' | 'comprehensive';
}

// Configuration for Report Chronology Alerts
export interface ReportChronologyAlertConfiguration {
  alertType: 'REPORT_CHRONOLOGY';
  vesselIMO: string;
  timeframeStart: string; // ISO date string
  timeframeEnd: string; // ISO date string
  depth: 'basic' | 'standard' | 'comprehensive';
}

// Configuration for Investigation Alerts
export interface InvestigationAlertConfiguration {
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

// Configuration for Maritime Alerts (generic product type for custom alerts)
export interface MaritimeAlertConfiguration {
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
  // For example, specific thresholds, conditions etc.
  customRuleName?: string; // User-defined name for this specific alert rule
}

// Discriminated union for all possible alert configurations
export type AlertConfigurationU =
  | VTSAlertConfiguration
  | AMSAlertConfiguration
  | FTSAlertConfiguration
  | ReportComplianceAlertConfiguration
  | ReportChronologyAlertConfiguration
  | InvestigationAlertConfiguration
  | MaritimeAlertConfiguration;

// Example of how ProductType could be used if needed directly,
// but alertType in each configuration interface serves as the discriminant.
// We ensure that the 'alertType' literals match values from ProductType.

// Helper type to ensure alertType literals match ProductType values -- REMOVED
// type EnsureAlertTypesValid<T extends { alertType: ProductType }> = T; -- REMOVED

// Test the configurations (not for runtime, just for type checking during dev) -- REMOVED
// const _testVTS: EnsureAlertTypesValid<VTSAlertConfiguration> = {} as any; -- REMOVED
// const _testAMS: EnsureAlertTypesValid<AMSAlertConfiguration> = {} as any; -- REMOVED
// ... and so on for other types -- REMOVED
