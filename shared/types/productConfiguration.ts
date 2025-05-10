import type { ProductType } from '@shared-types/product';
import type { Geometry } from 'geojson';

/**
 * Base interface for all product configurations
 * Ensures 'type' matches ProductType
 */
interface BaseProductConfiguration {
  type: ProductType;
}

/**
 * Configuration for Vessel Tracking Service Products
 */
export interface VTSProductConfiguration extends BaseProductConfiguration {
  type: 'VTS';
  trackingDurationDays: number;
  selectedCriteria: string[];
  vesselIMOs: string[];
}

/**
 * Configuration for Area Monitoring Service Products
 */
export interface AMSProductConfiguration extends BaseProductConfiguration {
  type: 'AMS';
  areaName?: string;
  monitoringDurationDays: number;
  aoiDefinition: Geometry;
  selectedCriteria: string[];
  updateFrequencyHours: 6 | 12 | 24;
  specificVesselIMOs?: string[];
  notes?: string;
}

/**
 * Configuration for Fleet Tracking Service Products
 */
export interface FTSProductConfiguration extends BaseProductConfiguration {
  type: 'FTS';
  fleetName: string;
  vessels: string[]; // IMO numbers
  monitoringDurationDays: number;
  selectedCriteria: string[];
}

/**
 * Configuration for Report Compliance Products
 */
export interface ReportComplianceProductConfiguration
  extends BaseProductConfiguration {
  type: 'REPORT_COMPLIANCE';
  vesselIMO: string;
  timeframeStart: string; // ISO date string
  timeframeEnd: string; // ISO date string
  depth: 'basic' | 'standard' | 'comprehensive';
}

/**
 * Configuration for Report Chronology Products
 */
export interface ReportChronologyProductConfiguration
  extends BaseProductConfiguration {
  type: 'REPORT_CHRONOLOGY';
  vesselIMO: string;
  timeframeStart: string; // ISO date string
  timeframeEnd: string; // ISO date string
  depth: 'basic' | 'standard' | 'comprehensive';
}

/**
 * Configuration for Investigation Products
 */
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

/**
 * Configuration for Maritime Alert Products
 */
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
  notes?: string;
}

/**
 * Discriminated union for all possible product configuration types
 * Used for type narrowing with configuration details.
 * This type is used for the core product configuration data model.
 */
export type ProductConfigurationType =
  | VTSProductConfiguration
  | AMSProductConfiguration
  | FTSProductConfiguration
  | ReportComplianceProductConfiguration
  | ReportChronologyProductConfiguration
  | InvestigationProductConfiguration
  | MaritimeAlertProductConfiguration;

/**
 * Alias for ProductConfigurationType used in user-facing contexts
 * such as cart items, orders, and user products.
 *
 * This type represents the same data as ProductConfigurationType
 * but is used specifically for configuration details that have been
 * filled out by users and are ready for processing.
 *
 * @example
 * // In a cart component
 * const configuration: ProductConfigurationDetailsU = {
 *   type: 'VTS',
 *   trackingDurationDays: 30,
 *   selectedCriteria: ['AIS_REPORTING_6HR', 'DARK_EVENT'],
 *   vesselIMOs: ['1234567', '7654321']
 * };
 */
export type ProductConfigurationDetailsU = ProductConfigurationType;