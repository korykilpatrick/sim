import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@components/ui';
import type { CartItem } from '@shared-types/cart';

/**
 * Props for the ConfirmationActions component
 */
export interface ConfirmationActionsProps {
  /** Array of cart items to determine which action buttons to show */
  items: CartItem[];
}

/**
 * Component for displaying action buttons based on product types
 *
 * @param props - The component props
 * @param props.items - Array of cart items to determine which action buttons to show
 * @returns The rendered action buttons based on the purchased product types
 */
export const ConfirmationActions: React.FC<ConfirmationActionsProps> = ({
  items,
}) => {
  const launchableProducts = items.filter((item) =>
    ['VTS', 'AMS', 'FTS', 'MARITIME_ALERT'].includes(item.product.type),
  );

  const hasReports = items.some((item) =>
    ['REPORT_COMPLIANCE', 'REPORT_CHRONOLOGY'].includes(item.product.type),
  );

  return (
    <div className="space-y-3">
      {launchableProducts.length > 0 && (
        <Link to="/protected/dashboard">
          <Button variant="primary" fullWidth>
            Launch Your Products
          </Button>
        </Link>
      )}

      {hasReports && (
        <Link to="/protected/reports">
          <Button variant="outline" fullWidth>
            View Your Reports
          </Button>
        </Link>
      )}

      <Link to="/marketplace">
        <Button
          variant={
            !launchableProducts.length && !hasReports ? 'primary' : 'outline'
          }
          fullWidth
        >
          Continue Shopping
        </Button>
      </Link>
    </div>
  );
};
