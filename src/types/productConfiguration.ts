import { ProductType } from './product';
import { Geometry } from 'geojson';

// Base for product configurations, ensuring 'type' matches ProductType
interface BaseProductConfiguration {
  type: ProductType;
}

// Configuration for Vessel Tracking Service Products
export interface VTSProductConfiguration extends BaseProductConfiguration {
  type: 'VTS';
  trackingDurationDays: number;
  selectedCriteria: string[];
  vesselIMOs: string[];
}

// Configuration for Area Monitoring Service Products
export interface AMSProductConfiguration extends BaseProductConfiguration {
  type: 'AMS';
  monitoringDurationDays: number;
  aoiDefinition: Geometry;
  selectedCriteria: string[];
  updateFrequencyHours: 6 | 12 | 24;
}

// Configuration for Fleet Tracking Service Products
export interface FTSProductConfiguration extends BaseProductConfiguration {
  type: 'FTS';
  fleetName: string;
  vessels: string[]; // IMO numbers
  monitoringDurationDays: number;
  selectedCriteria: string[];
}

// Configuration for Report Compliance Products
export interface ReportComplianceProductConfiguration
  extends BaseProductConfiguration {
  type: 'REPORT_COMPLIANCE';
  vesselIMO: string;
  timeframeStart: string; // ISO date string
  timeframeEnd: string; // ISO date string
  depth: 'basic' | 'standard' | 'comprehensive';
}

// Configuration for Report Chronology Products
export interface ReportChronologyProductConfiguration
  extends BaseProductConfiguration {
  type: 'REPORT_CHRONOLOGY';
  vesselIMO: string;
  timeframeStart: string; // ISO date string
  timeframeEnd: string; // ISO date string
  depth: 'basic' | 'standard' | 'comprehensive';
}

// Configuration for Investigation Products
export interface InvestigationProductConfiguration
  extends BaseProductConfiguration {
  type: 'INVESTIGATION';
  investigationType: string;
  vesselIMO?: string;
  region?: string;
  timeframe?: {
    start: string; // ISO date string
    end: string; // ISO date string
  };
  additionalInfo?: string;
}

// Configuration for Maritime Alert Products
export interface MaritimeAlertProductConfiguration
  extends BaseProductConfiguration {
  type: 'MARITIME_ALERT';
  maritimeAlertType: 'SHIP' | 'AREA' | 'SHIP_AND_AREA';
  selectedCriteria: string[];
  vesselIMOs?: string[];
  aoiDefinition?: Geometry;
  monitoringDurationDays?: number;
  updateFrequencyHours?: 6 | 12 | 24;
  customRuleName?: string;
}

// Discriminated union for all possible product configuration details
export type ProductConfigurationDetailsU =
  | VTSProductConfiguration
  | AMSProductConfiguration
  | FTSProductConfiguration
  | ReportComplianceProductConfiguration
  | ReportChronologyProductConfiguration
  | InvestigationProductConfiguration
  | MaritimeAlertProductConfiguration;
