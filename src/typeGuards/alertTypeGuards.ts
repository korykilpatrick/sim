/**
 * Alert Type Guards
 *
 * Type guards specific to alert types and configurations in the application.
 * These help ensure type safety when working with the various alert types and their configurations.
 */

import type {
  AlertConfigurationU as AlertConfigurationType,
  VTSAlertConfiguration,
  AMSAlertConfiguration,
  FTSAlertConfiguration,
  ReportComplianceConfiguration as ReportComplianceAlertConfiguration,
  ReportChronologyConfiguration as ReportChronologyAlertConfiguration,
  InvestigationConfiguration as InvestigationAlertConfiguration,
  MaritimeAlertConfiguration,
} from '@features/alerts/types';

import { isObject, hasProperty, isOfDiscriminatedType } from './baseTypeGuards';

/**
 * Type guard for checking if a value is a VTS alert configuration.
 *
 * @param value - Value to check
 * @returns True if the value is a valid VTS alert configuration
 */
export function isVTSAlertConfig(
  value: unknown,
): value is VTSAlertConfiguration {
  if (!isObject(value)) return false;

  return (
    isOfDiscriminatedType(value, 'alertType', 'VTS') &&
    hasProperty(value, 'trackingDurationDays') &&
    hasProperty(value, 'selectedCriteria') &&
    hasProperty(value, 'vesselIMOs') &&
    Array.isArray(value.selectedCriteria) &&
    Array.isArray(value.vesselIMOs)
  );
}

/**
 * Type guard for checking if a value is an AMS alert configuration.
 *
 * @param value - Value to check
 * @returns True if the value is a valid AMS alert configuration
 */
export function isAMSAlertConfig(
  value: unknown,
): value is AMSAlertConfiguration {
  if (!isObject(value)) return false;

  return (
    isOfDiscriminatedType(value, 'alertType', 'AMS') &&
    hasProperty(value, 'monitoringDurationDays') &&
    hasProperty(value, 'aoiDefinition') &&
    hasProperty(value, 'selectedCriteria') &&
    hasProperty(value, 'updateFrequencyHours') &&
    Array.isArray(value.selectedCriteria)
  );
}

/**
 * Type guard for checking if a value is an FTS alert configuration.
 *
 * @param value - Value to check
 * @returns True if the value is a valid FTS alert configuration
 */
export function isFTSAlertConfig(
  value: unknown,
): value is FTSAlertConfiguration {
  if (!isObject(value)) return false;

  return (
    isOfDiscriminatedType(value, 'alertType', 'FTS') &&
    hasProperty(value, 'fleetName') &&
    hasProperty(value, 'vessels') &&
    hasProperty(value, 'monitoringDurationDays') &&
    hasProperty(value, 'selectedCriteria') &&
    Array.isArray(value.vessels) &&
    Array.isArray(value.selectedCriteria)
  );
}

/**
 * Type guard for checking if a value is a Report Compliance alert configuration.
 *
 * @param value - Value to check
 * @returns True if the value is a valid Report Compliance alert configuration
 */
export function isReportComplianceAlertConfig(
  value: unknown,
): value is ReportComplianceAlertConfiguration {
  if (!isObject(value)) return false;

  return (
    isOfDiscriminatedType(value, 'alertType', 'REPORT_COMPLIANCE') &&
    hasProperty(value, 'vesselIMO') &&
    hasProperty(value, 'timeframeStart') &&
    hasProperty(value, 'timeframeEnd') &&
    hasProperty(value, 'depth')
  );
}

/**
 * Type guard for checking if a value is a Report Chronology alert configuration.
 *
 * @param value - Value to check
 * @returns True if the value is a valid Report Chronology alert configuration
 */
export function isReportChronologyAlertConfig(
  value: unknown,
): value is ReportChronologyAlertConfiguration {
  if (!isObject(value)) return false;

  return (
    isOfDiscriminatedType(value, 'alertType', 'REPORT_CHRONOLOGY') &&
    hasProperty(value, 'vesselIMO') &&
    hasProperty(value, 'timeframeStart') &&
    hasProperty(value, 'timeframeEnd') &&
    hasProperty(value, 'depth')
  );
}

/**
 * Type guard for checking if a value is an Investigation alert configuration.
 *
 * @param value - Value to check
 * @returns True if the value is a valid Investigation alert configuration
 */
export function isInvestigationAlertConfig(
  value: unknown,
): value is InvestigationAlertConfiguration {
  if (!isObject(value)) return false;

  return (
    isOfDiscriminatedType(value, 'alertType', 'INVESTIGATION') &&
    hasProperty(value, 'investigationType')
  );
}

/**
 * Type guard for checking if a value is a Maritime alert configuration.
 *
 * @param value - Value to check
 * @returns True if the value is a valid Maritime alert configuration
 */
export function isMaritimeAlertConfig(
  value: unknown,
): value is MaritimeAlertConfiguration {
  if (!isObject(value)) return false;

  return (
    isOfDiscriminatedType(value, 'alertType', 'MARITIME_ALERT') &&
    hasProperty(value, 'maritimeAlertType') &&
    hasProperty(value, 'selectedCriteria') &&
    Array.isArray(value.selectedCriteria)
  );
}

/**
 * Type guard for checking if a value is a valid alert configuration.
 *
 * @param value - Value to check
 * @returns True if the value is a valid alert configuration
 */
export function isAlertConfiguration(
  value: unknown,
): value is AlertConfigurationType {
  if (!isObject(value) || !hasProperty(value, 'alertType')) return false;

  const alertType = value.alertType;

  switch (alertType) {
    case 'VTS':
      return isVTSAlertConfig(value);
    case 'AMS':
      return isAMSAlertConfig(value);
    case 'FTS':
      return isFTSAlertConfig(value);
    case 'REPORT_COMPLIANCE':
      return isReportComplianceAlertConfig(value);
    case 'REPORT_CHRONOLOGY':
      return isReportChronologyAlertConfig(value);
    case 'INVESTIGATION':
      return isInvestigationAlertConfig(value);
    case 'MARITIME_ALERT':
      return isMaritimeAlertConfig(value);
    default:
      return false;
  }
}
