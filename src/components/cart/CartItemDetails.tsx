import React from 'react';
import { ProductConfigurationType } from '@shared-types/productConfiguration';

/**
 * Props for the CartItemDetails component
 */
export interface CartItemDetailsProps {
  /** Product name */
  productName: string;
  /** Product configuration details */
  configurationDetails?: ProductConfigurationType | undefined;
  /** Total price for the item */
  totalPrice: number;
  /** Total credits for the item */
  totalCredits: number;
}

/**
 * Component for displaying cart item details including name, configuration, and pricing
 *
 * @param props - The component props
 * @param props.productName - Name of the product
 * @param props.configurationDetails - Optional configuration details for the product
 * @param props.totalPrice - Total price for the item
 * @param props.totalCredits - Total credits for the item
 * @returns The rendered cart item details component
 */
export const CartItemDetails: React.FC<CartItemDetailsProps> = ({
  productName,
  configurationDetails,
  totalPrice,
  totalCredits,
}) => {
  /**
   * Creates a human-readable summary of the product configuration
   * 
   * @returns A string representation of the configuration or null if no configuration exists
   */
  const getConfigSummary = (): string | null => {
    if (!configurationDetails) return null;

    const config = configurationDetails;
    let duration: number | undefined;

    switch (config.type) {
      case 'VTS':
        duration = config.trackingDurationDays;
        break;
      case 'AMS':
        duration = config.monitoringDurationDays;
        break;
      case 'MARITIME_ALERT':
        duration = config.monitoringDurationDays;
        break;
      case 'FTS':
        duration = config.monitoringDurationDays;
        break;
    }

    if (duration !== undefined) {
      return `${duration} days`;
    }

    if (
      config.type === 'REPORT_COMPLIANCE' ||
      config.type === 'REPORT_CHRONOLOGY'
    ) {
      return `Depth: ${config.depth}`;
    }

    return null;
  };

  const configSummary = getConfigSummary();

  return (
    <div className="flex-1 md:ml-6 mt-4 md:mt-0">
      <div className="flex flex-col md:flex-row md:justify-between">
        <div>
          <h3 className="text-lg font-medium text-secondary-900">
            {productName}
          </h3>
          <p className="mt-1 text-sm text-secondary-500">
            {configSummary ? (
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800">
                {configSummary}
              </span>
            ) : null}
          </p>
        </div>

        <div className="mt-4 md:mt-0 text-right">
          <p className="text-lg font-medium text-secondary-900">
            ${totalPrice.toFixed(2)}
          </p>
          <p className="text-sm text-secondary-500">{totalCredits} credits</p>
        </div>
      </div>
    </div>
  );
};
