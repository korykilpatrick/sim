import React from 'react';
import { Link } from 'react-router-dom';
import { format, isValid } from 'date-fns';
import { Button, Badge } from '@components/common';
import type { UserProduct } from '@shared-types/userProduct';
import type {
  VTSProductConfiguration,
  AMSProductConfiguration,
  FTSProductConfiguration,
  MaritimeAlertProductConfiguration,
  ReportComplianceProductConfiguration,
  ReportChronologyProductConfiguration,
} from '@shared-types/productConfiguration';

// interface UserProduct {
//   id: string;
//   productId: string;
//   name: string;
//   type: string;
//   purchaseDate: string;
//   expiryDate: string;
//   status: 'active' | 'expired' | 'pending';
//   configuration?: any;
// }

// interface ProductCardProps {
//   product: UserProduct;
// }

type ProductCardProps = {
  product: UserProduct;
};

/**
 * Component for displaying a purchased product card with status and configuration details
 * 
 * @param props - The component props
 * @param props.product - The user product data to display
 * @returns The rendered product card with name, status, configuration summary, and dates
 */
export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const {
    id: _id,
    name,
    type,
    purchaseDate,
    expiryDate,
    status,
    configuration,
  } = product;

  const purchaseDateObj = purchaseDate ? new Date(purchaseDate) : null;
  const expiryDateObj = expiryDate ? new Date(expiryDate) : null;

  const formattedPurchaseDate =
    purchaseDateObj && isValid(purchaseDateObj)
      ? format(purchaseDateObj, 'MMM d, yyyy')
      : 'N/A';
  const formattedExpiryDate =
    expiryDateObj && isValid(expiryDateObj)
      ? format(expiryDateObj, 'MMM d, yyyy')
      : 'N/A';

  const today = new Date();
  let daysRemaining = -1;
  if (expiryDateObj && isValid(expiryDateObj)) {
    daysRemaining = Math.ceil(
      (expiryDateObj.getTime() - today.getTime()) / (1000 * 60 * 60 * 24),
    );
  }

  const canLaunch = status === 'active' && daysRemaining > 0;

  const statusDisplay = () => {
    if (status === 'active') {
      if (daysRemaining <= 0) {
        return { label: 'Expired', variant: 'danger' as const };
      } else if (daysRemaining <= 7) {
        return { label: 'Expiring Soon', variant: 'warning' as const };
      } else {
        return { label: 'Active', variant: 'success' as const };
      }
    } else if (status === 'pending_activation') {
      return { label: 'Pending Activation', variant: 'info' as const };
    } else if (status === 'expired') {
      return { label: 'Expired', variant: 'danger' as const };
    } else if (status === 'cancelled') {
      return { label: 'Cancelled', variant: 'secondary' as const };
    } else if (status === 'suspended') {
      return { label: 'Suspended', variant: 'warning' as const };
    }
    // Fallback should not be reached if all UserProductStatus cases are handled above.
    // If UserProductStatus expands, this will cause a type error, which is good.
    // To satisfy TS that all paths return a value, explicitly handle 'never' or assert.
    // However, a robust way is to ensure all enum members are checked.
    // For now, let's add a default that should ideally not be hit.
    return { label: 'Unknown', variant: 'secondary' as const };
  };

  const { label, variant } = statusDisplay();

  const getProductLink = () => {
    switch (type) {
      case 'VTS':
        return `/protected/vts/${product.productId}`;
      case 'AMS':
        return `/protected/ams/${product.productId}`;
      case 'FTS':
        return `/protected/fts/${product.productId}`;
      case 'REPORT_COMPLIANCE':
      case 'REPORT_CHRONOLOGY':
        return `/protected/reports/${product.productId}`;
      case 'MARITIME_ALERT':
        return `/protected/alerts/${product.productId}`;
      default:
        return `/protected/dashboard`; // Fallback link
    }
  };

  const getConfigSummary = () => {
    if (!configuration) return null;
    const summaryItems = [];

    if (configuration.type === 'VTS') {
      const config = configuration as VTSProductConfiguration;
      if (config.trackingDurationDays)
        summaryItems.push(`Duration: ${config.trackingDurationDays} days`);
      if (config.vesselIMOs && config.vesselIMOs.length)
        summaryItems.push(`Tracking ${config.vesselIMOs.length} vessel(s)`);
      if (config.selectedCriteria && config.selectedCriteria.length)
        summaryItems.push(`${config.selectedCriteria.length} criteria`);
    } else if (configuration.type === 'AMS') {
      const config = configuration as AMSProductConfiguration;
      if (config.monitoringDurationDays)
        summaryItems.push(`Duration: ${config.monitoringDurationDays} days`);
      if (config.areaName) summaryItems.push(`Area: ${config.areaName}`);
      if (config.selectedCriteria && config.selectedCriteria.length)
        summaryItems.push(`${config.selectedCriteria.length} criteria`);
    } else if (configuration.type === 'FTS') {
      const config = configuration as FTSProductConfiguration;
      if (config.fleetName) summaryItems.push(`Fleet: ${config.fleetName}`);
      if (config.monitoringDurationDays)
        summaryItems.push(`Duration: ${config.monitoringDurationDays} days`);
    } else if (configuration.type === 'MARITIME_ALERT') {
      const config = configuration as MaritimeAlertProductConfiguration;
      if (config.customRuleName)
        summaryItems.push(`Rule: ${config.customRuleName}`);
      if (config.monitoringDurationDays)
        summaryItems.push(`Duration: ${config.monitoringDurationDays} days`);
      if (config.selectedCriteria && config.selectedCriteria.length)
        summaryItems.push(`${config.selectedCriteria.length} criteria`);
    } else if (
      configuration.type === 'REPORT_COMPLIANCE' ||
      configuration.type === 'REPORT_CHRONOLOGY'
    ) {
      const config = configuration as
        | ReportComplianceProductConfiguration
        | ReportChronologyProductConfiguration;
      summaryItems.push(`Vessel: ${config.vesselIMO}`);
      summaryItems.push(`Depth: ${config.depth}`);
    } // Add Investigation if needed

    return summaryItems.length > 0 ? summaryItems.join(' • ') : null;
  };

  const configSummary = getConfigSummary();

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="p-6">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-lg font-semibold text-secondary-900">{name}</h3>
            <p className="text-sm text-secondary-500 mt-1">
              <Badge variant={variant}>{label}</Badge>
            </p>
          </div>

          <Link
            to={getProductLink()}
            onClick={(e) => {
              if (!canLaunch) {
                e.preventDefault();
              }
            }}
            aria-disabled={!canLaunch}
            tabIndex={!canLaunch ? -1 : undefined}
            className={!canLaunch ? 'pointer-events-none opacity-50' : ''}
          >
            <Button variant="primary" size="sm" disabled={!canLaunch}>
              Launch
            </Button>
          </Link>
        </div>

        {configSummary && (
          <p className="text-sm text-secondary-600 mt-4">{configSummary}</p>
        )}

        <div className="mt-4 pt-4 border-t border-secondary-200 grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-secondary-500">Purchased On</p>
            <p className="font-medium text-secondary-900">
              {formattedPurchaseDate}
            </p>
          </div>

          <div>
            <p className="text-secondary-500">Expiry Date</p>
            <p
              className={`font-medium ${daysRemaining <= 7 && daysRemaining > 0 ? 'text-yellow-600' : daysRemaining <= 0 ? 'text-red-600' : 'text-secondary-900'}`}
            >
              {formattedExpiryDate}
              {daysRemaining > 0 && ` (${daysRemaining} days left)`}
              {status === 'active' &&
                daysRemaining <= 0 &&
                formattedExpiryDate !== 'N/A' &&
                ' (Expired)'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
