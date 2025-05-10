import React from 'react';
import type { MaritimeAlertProduct } from '@shared-types/product';

/**
 * Props for the ProductSpecialFeatures component
 */
export interface ProductSpecialFeaturesProps {
  /** Product data */
  product: MaritimeAlertProduct;
}

/**
 * Component for displaying special features for Maritime Alert products
 */
export const ProductSpecialFeatures: React.FC<ProductSpecialFeaturesProps> = ({
  product,
}) => {
  return (
    <div className="mt-6">
      <h3 className="text-lg font-medium mb-3">Alert Types Available</h3>
      <ul className="list-disc list-inside space-y-2 text-secondary-700">
        {product.alertTypesAvailable.map((alertType: string) => (
          <li key={alertType}>
            {alertType === 'SHIP' &&
              'Ship-based alerts - Track specific vessels'}
            {alertType === 'AREA' &&
              'Area-based alerts - Monitor defined geographical areas'}
            {alertType === 'SHIP_AND_AREA' &&
              'Combined ship and area monitoring'}
          </li>
        ))}
      </ul>
    </div>
  );
};
