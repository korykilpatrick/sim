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
  aoiDefinition: any; // GeoJSON or similar
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