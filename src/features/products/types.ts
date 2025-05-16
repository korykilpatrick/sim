/**
 * Product type definitions for the SIM application
 */

/**
 * Enum for product types in the system
 */
export enum ProductType {
  VTS = 'VTS',
  AMS = 'AMS',
  FTS = 'FTS',
  REPORT_COMPLIANCE = 'REPORT_COMPLIANCE',
  REPORT_CHRONOLOGY = 'REPORT_CHRONOLOGY',
  INVESTIGATION = 'INVESTIGATION',
  MARITIME_ALERT = 'MARITIME_ALERT'
}

/**
 * Base product interface
 */
export interface BaseProduct {
  id: string;
  name: string;
  shortDescription: string;
  longDescription: string;
  type: ProductType;
  price: number;
  creditCost: number;
  imageUrl?: string;
  tags?: string[];
}

/**
 * Maritime Alert product interface
 */
export interface MaritimeAlertProduct extends BaseProduct {
  type: ProductType.MARITIME_ALERT;
  alertTypesAvailable: Array<'SHIP' | 'AREA' | 'SHIP_AND_AREA'>;
}

/**
 * Vessel Tracking System product interface
 */
export interface VTSProduct extends BaseProduct {
  type: ProductType.VTS;
  maxVessels: number;
  trackingOptions: string[];
}

/**
 * Area Monitoring System product interface
 */
export interface AMSProduct extends BaseProduct {
  type: ProductType.AMS;
  maxAreas: number;
  monitoringOptions: string[];
}

/**
 * Fleet Tracking System product interface
 */
export interface FTSProduct extends BaseProduct {
  type: ProductType.FTS;
  maxFleetSize: number;
  trackingOptions: string[];
}

/**
 * Report Compliance product interface
 */
export interface ReportComplianceProduct extends BaseProduct {
  type: ProductType.REPORT_COMPLIANCE;
  reportDepthOptions: string[];
  complianceStandards: string[];
}

/**
 * Report Chronology product interface
 */
export interface ReportChronologyProduct extends BaseProduct {
  type: ProductType.REPORT_CHRONOLOGY;
  reportDepthOptions: string[];
  timeframeOptions: string[];
}

/**
 * Investigation product interface
 */
export interface InvestigationProduct extends BaseProduct {
  type: ProductType.INVESTIGATION;
  investigationTypes: Array<'vessel' | 'company' | 'incident'>;
  priorityLevels: Array<'low' | 'medium' | 'high'>;
}

/**
 * Union type for all product types
 */
export type Product =
  | BaseProduct
  | MaritimeAlertProduct
  | VTSProduct
  | AMSProduct
  | FTSProduct
  | ReportComplianceProduct
  | ReportChronologyProduct
  | InvestigationProduct;
