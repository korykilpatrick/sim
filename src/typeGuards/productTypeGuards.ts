/**
 * Product Type Guards
 *
 * Type guards specific to product types and configurations in the application.
 * These help ensure type safety when working with the various product types and their configurations.
 */

import type {
  ProductType,
  BaseProduct,
  MaritimeAlertProduct,
} from '@shared-types/product';

import type {
  ProductConfigurationType,
  VTSProductConfiguration,
  AMSProductConfiguration,
  FTSProductConfiguration,
  ReportComplianceProductConfiguration,
  ReportChronologyProductConfiguration,
  InvestigationProductConfiguration,
  MaritimeAlertProductConfiguration,
} from '@shared-types/productConfiguration';

import { isObject, hasProperty } from './baseTypeGuards';

/**
 * Type guard for checking if a value is a BaseProduct.
 *
 * @param value - Value to check
 * @returns True if the value is a valid BaseProduct
 */
export function isBaseProduct(value: unknown): value is BaseProduct {
  if (!isObject(value)) return false;

  const requiredProps: (keyof BaseProduct)[] = [
    'id',
    'name',
    'shortDescription',
    'longDescription',
    'type',
    'price',
    'creditCost',
  ];

  return requiredProps.every((prop) => hasProperty(value, prop));
}

/**
 * Type guard for checking if a product is a MaritimeAlertProduct.
 *
 * @param value - Value to check
 * @returns True if the value is a valid MaritimeAlertProduct
 */
export function isMaritimeAlertProduct(
  value: unknown,
): value is MaritimeAlertProduct {
  if (!isBaseProduct(value)) return false;

  return (
    hasProperty(value, 'type') &&
    value.type === 'MARITIME_ALERT' &&
    hasProperty(value, 'alertTypesAvailable') &&
    Array.isArray(value.alertTypesAvailable)
  );
}

/**
 * Type guard for checking if a product type is valid.
 *
 * @param value - Value to check
 * @returns True if the value is a valid ProductType
 */
export function isValidProductType(value: unknown): value is ProductType {
  if (typeof value !== 'string') return false;

  const validTypes: ProductType[] = [
    'VTS',
    'AMS',
    'FTS',
    'REPORT_COMPLIANCE',
    'REPORT_CHRONOLOGY',
    'INVESTIGATION',
    'MARITIME_ALERT',
  ];

  return validTypes.includes(value as ProductType);
}

/**
 * Type guard for a specific product type.
 *
 * @param value - Value to check
 * @param productType - Specific product type to check for
 * @returns True if the product matches the specific type
 */
export function isProductOfType(
  value: unknown,
  productType: ProductType,
): value is BaseProduct {
  return isBaseProduct(value) && value.type === productType;
}

/**
 * Type-safe function to get product name by type.
 * Uses exhaustive checking to ensure all product types are handled.
 *
 * @param productType - The product type to get a display name for
 * @returns Human-readable product type name
 */
export function getProductTypeName(productType: ProductType): string {
  switch (productType) {
    case 'VTS':
      return 'Vessel Tracking Service';
    case 'AMS':
      return 'Area Monitoring Service';
    case 'FTS':
      return 'Fleet Tracking Service';
    case 'REPORT_COMPLIANCE':
      return 'Compliance Report';
    case 'REPORT_CHRONOLOGY':
      return 'Chronology Report';
    case 'INVESTIGATION':
      return 'Investigation Service';
    case 'MARITIME_ALERT':
      return 'Maritime Alert Service';
    default: {
      // This ensures exhaustive checking
      const _exhaustiveCheck: never = productType;
      throw new Error(`Unhandled product type: ${_exhaustiveCheck}`);
    }
  }
}

/**
 * Type guard for checking if a value is a VTS product configuration.
 *
 * @param value - Value to check
 * @returns True if the value is a valid VTS product configuration
 */
export function isVTSConfig(value: unknown): value is VTSProductConfiguration {
  if (!isObject(value)) return false;

  return (
    hasProperty(value, 'type') &&
    value.type === 'VTS' &&
    hasProperty(value, 'trackingDurationDays') &&
    hasProperty(value, 'selectedCriteria') &&
    hasProperty(value, 'vesselIMOs') &&
    Array.isArray(value.selectedCriteria) &&
    Array.isArray(value.vesselIMOs)
  );
}

/**
 * Type guard for checking if a value is an AMS product configuration.
 *
 * @param value - Value to check
 * @returns True if the value is a valid AMS product configuration
 */
export function isAMSConfig(value: unknown): value is AMSProductConfiguration {
  if (!isObject(value)) return false;

  return (
    hasProperty(value, 'type') &&
    value.type === 'AMS' &&
    hasProperty(value, 'monitoringDurationDays') &&
    hasProperty(value, 'aoiDefinition') &&
    hasProperty(value, 'selectedCriteria') &&
    hasProperty(value, 'updateFrequencyHours') &&
    Array.isArray(value.selectedCriteria)
  );
}

/**
 * Type guard for checking if a value is an FTS product configuration.
 *
 * @param value - Value to check
 * @returns True if the value is a valid FTS product configuration
 */
export function isFTSConfig(value: unknown): value is FTSProductConfiguration {
  if (!isObject(value)) return false;

  return (
    hasProperty(value, 'type') &&
    value.type === 'FTS' &&
    hasProperty(value, 'fleetName') &&
    hasProperty(value, 'vessels') &&
    hasProperty(value, 'monitoringDurationDays') &&
    hasProperty(value, 'selectedCriteria') &&
    Array.isArray(value.vessels) &&
    Array.isArray(value.selectedCriteria)
  );
}

/**
 * Type guard for checking if a value is a Report Compliance product configuration.
 *
 * @param value - Value to check
 * @returns True if the value is a valid Report Compliance product configuration
 */
export function isReportComplianceConfig(
  value: unknown,
): value is ReportComplianceProductConfiguration {
  if (!isObject(value)) return false;

  return (
    hasProperty(value, 'type') &&
    value.type === 'REPORT_COMPLIANCE' &&
    hasProperty(value, 'vesselIMO') &&
    hasProperty(value, 'timeframeStart') &&
    hasProperty(value, 'timeframeEnd') &&
    hasProperty(value, 'depth')
  );
}

/**
 * Type guard for checking if a value is a Report Chronology product configuration.
 *
 * @param value - Value to check
 * @returns True if the value is a valid Report Chronology product configuration
 */
export function isReportChronologyConfig(
  value: unknown,
): value is ReportChronologyProductConfiguration {
  if (!isObject(value)) return false;

  return (
    hasProperty(value, 'type') &&
    value.type === 'REPORT_CHRONOLOGY' &&
    hasProperty(value, 'vesselIMO') &&
    hasProperty(value, 'timeframeStart') &&
    hasProperty(value, 'timeframeEnd') &&
    hasProperty(value, 'depth')
  );
}

/**
 * Type guard for checking if a value is an Investigation product configuration.
 *
 * @param value - Value to check
 * @returns True if the value is a valid Investigation product configuration
 */
export function isInvestigationConfig(
  value: unknown,
): value is InvestigationProductConfiguration {
  if (!isObject(value)) return false;

  return (
    hasProperty(value, 'type') &&
    value.type === 'INVESTIGATION' &&
    hasProperty(value, 'investigationType')
  );
}

/**
 * Type guard for checking if a value is a Maritime Alert product configuration.
 *
 * @param value - Value to check
 * @returns True if the value is a valid Maritime Alert product configuration
 */
export function isMaritimeAlertConfig(
  value: unknown,
): value is MaritimeAlertProductConfiguration {
  if (!isObject(value)) return false;

  return (
    hasProperty(value, 'type') &&
    value.type === 'MARITIME_ALERT' &&
    hasProperty(value, 'maritimeAlertType') &&
    hasProperty(value, 'selectedCriteria') &&
    Array.isArray(value.selectedCriteria)
  );
}

/**
 * Type guard for checking if a value is a valid product configuration type.
 *
 * @param value - Value to check
 * @returns True if the value is a valid product configuration
 */
export function isProductConfiguration(
  value: unknown,
): value is ProductConfigurationType {
  if (!isObject(value) || !hasProperty(value, 'type')) return false;

  const type = value.type;

  switch (type) {
    case 'VTS': {
      return isVTSConfig(value);
    }
    case 'AMS': {
      return isAMSConfig(value);
    }
    case 'FTS': {
      return isFTSConfig(value);
    }
    case 'REPORT_COMPLIANCE': {
      return isReportComplianceConfig(value);
    }
    case 'REPORT_CHRONOLOGY': {
      return isReportChronologyConfig(value);
    }
    case 'INVESTIGATION': {
      return isInvestigationConfig(value);
    }
    case 'MARITIME_ALERT': {
      return isMaritimeAlertConfig(value);
    }
    default: {
      return false;
    }
  }
}
