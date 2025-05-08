import { Geometry } from 'geojson'; // Import GeoJSON type

export type ProductType =
  | 'VTS'
  | 'AMS'
  | 'FTS'
  | 'REPORT_COMPLIANCE'
  | 'REPORT_CHRONOLOGY'
  | 'INVESTIGATION'
  | 'MARITIME_ALERT';

export interface BaseProduct {
  id: string;
  name: string;
  shortDescription: string;
  longDescription: string;
  type: ProductType;
  price: number; // Currency amount
  creditCost: number;
  imageUrl?: string;
  tags?: string[];
  // Common configuration options might go here if widely applicable
}

export interface MaritimeAlertProduct extends BaseProduct {
  type: 'MARITIME_ALERT';
  // Specific configuration options for Maritime Alert
  alertTypesAvailable: Array<'SHIP' | 'AREA' | 'SHIP_AND_AREA'>;
  // Further criteria options can be nested or fetched separately
}

export interface VesselTrackingServiceConfig {
  productId: string; // Links to BaseProduct of type VTS
  trackingDurationDays: number;
  selectedCriteria: string[]; // e.g., ['AIS_REPORTING_6HR', 'DARK_EVENT']
  vesselIMOs: string[];
}

export interface AreaMonitoringServiceConfig {
  productId: string; // Links to BaseProduct of type AMS
  monitoringDurationDays: number;
  aoiDefinition?: Geometry; // Use GeoJSON Geometry type, make optional
  areaName?: string; // Added to support mock data
  selectedCriteria: string[];
  updateFrequencyHours: 6 | 12 | 24;
}

export interface FleetTrackingServiceConfig {
  productId: string;
  fleetName: string;
  vessels: string[]; // IMO numbers
  monitoringDurationDays: number;
  selectedCriteria: string[];
}

export interface ReportConfig {
  productId: string;
  vesselIMO: string;
  timeframeStart: string;
  timeframeEnd: string;
  depth: 'basic' | 'standard' | 'comprehensive';
}

export interface InvestigationConfig {
  productId: string;
  investigationType: string;
  vesselIMO?: string;
  region?: string;
  timeframe?: {
    start: string;
    end: string;
  };
  additionalInfo?: string;
}

export type ProductServiceConfig =
  | VesselTrackingServiceConfig
  | AreaMonitoringServiceConfig
  | FleetTrackingServiceConfig
  | ReportConfig
  | InvestigationConfig
  | MaritimeAlertProductConfig; // Assuming a config for MaritimeAlertProduct

// We need to define MaritimeAlertProductConfig if it's different from MaritimeAlertProduct's direct properties
// For now, let's assume MaritimeAlertProduct might have specific configurable aspects
// that are not just its top-level properties.
// If MaritimeAlertProduct itself holds all its "config", we might not need a separate config object for it,
// or its config would be part of MaritimeAlertProduct.

// Let's define a placeholder for MaritimeAlertProductConfig.
// Based on the data, MARITIME_ALERT products don't show separate config in orders/userProducts.
// The 'configurationDetails' for MARITIME_ALERT type product is not present in the provided data snippet for orders.
// Let's assume for now that it might have a specific configuration.
// If it doesn't, we can remove it from the union or define it more accurately later.

export interface MaritimeAlertProductConfig {
  productId: string; // Links to BaseProduct of type MARITIME_ALERT
  // Example configuration fields, adjust as necessary
  alertTriggers: string[]; // e.g., ['VESSEL_ENTERS_ZONE', 'SPEED_THRESHOLD_EXCEEDED']
  notificationChannels: Array<'EMAIL' | 'SMS' | 'APP'>;
}
