import React from 'react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { Button } from '@components/common/Button';
import { Badge } from '@components/common/Badge';

interface UserProduct {
  id: string;
  productId: string;
  name: string;
  type: string;
  purchaseDate: string;
  expiryDate: string;
  status: 'active' | 'expired' | 'pending';
  configuration?: any;
}

interface ProductCardProps {
  product: UserProduct;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const {
    id,
    name,
    type,
    purchaseDate,
    expiryDate,
    status,
    configuration,
  } = product;
  
  // Format dates
  const formattedPurchaseDate = format(new Date(purchaseDate), 'MMM d, yyyy');
  const formattedExpiryDate = format(new Date(expiryDate), 'MMM d, yyyy');
  
  // Determine days remaining
  const today = new Date();
  const expiry = new Date(expiryDate);
  const daysRemaining = Math.ceil((expiry.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
  
  // Determine product status for display
  const statusDisplay = () => {
    if (status === 'active') {
      if (daysRemaining <= 0) {
        return { label: 'Expired', variant: 'danger' as const };
      } else if (daysRemaining <= 7) {
        return { label: 'Expiring Soon', variant: 'warning' as const };
      } else {
        return { label: 'Active', variant: 'success' as const };
      }
    } else if (status === 'pending') {
      return { label: 'Processing', variant: 'info' as const };
    } else {
      return { label: 'Expired', variant: 'danger' as const };
    }
  };
  
  const { label, variant } = statusDisplay();
  
  // Determine product link based on type
  const getProductLink = () => {
    switch (type) {
      case 'VTS':
        return `/protected/vts/${id}`;
      case 'AMS':
        return `/protected/ams/${id}`;
      case 'FTS':
        return `/protected/fts/${id}`;
      case 'REPORT_COMPLIANCE':
      case 'REPORT_CHRONOLOGY':
        return `/protected/reports/${id}`;
      case 'MARITIME_ALERT':
        // Could go to alert configuration or alert list
        return `/protected/alerts/${id}`;
      default:
        return `/protected/dashboard`;
    }
  };
  
  // Get configuration summary
  const getConfigSummary = () => {
    if (!configuration) return null;
    
    const summaryItems = [];
    
    if (configuration.trackingDurationDays || configuration.monitoringDurationDays) {
      const duration = configuration.trackingDurationDays || configuration.monitoringDurationDays;
      summaryItems.push(`Duration: ${duration} days`);
    }
    
    if (configuration.vesselIMOs && configuration.vesselIMOs.length) {
      summaryItems.push(`Tracking ${configuration.vesselIMOs.length} vessel(s)`);
    }
    
    if (configuration.selectedCriteria && configuration.selectedCriteria.length) {
      summaryItems.push(`${configuration.selectedCriteria.length} criteria selected`);
    }
    
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
          
          <Button
            as={Link}
            to={getProductLink()}
            variant="primary"
            size="sm"
            disabled={status === 'expired' || daysRemaining <= 0}
          >
            Launch
          </Button>
        </div>
        
        {configSummary && (
          <p className="text-sm text-secondary-600 mt-4">
            {configSummary}
          </p>
        )}
        
        <div className="mt-4 pt-4 border-t border-secondary-200 grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-secondary-500">Purchased On</p>
            <p className="font-medium text-secondary-900">{formattedPurchaseDate}</p>
          </div>
          
          <div>
            <p className="text-secondary-500">Expiry Date</p>
            <p className={`font-medium ${daysRemaining <= 7 ? 'text-red-600' : 'text-secondary-900'}`}>
              {formattedExpiryDate}
              {daysRemaining > 0 && ` (${daysRemaining} days left)`}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};