import React from 'react';

/**
 * Props for the ProductInformation component
 */
export interface ProductInformationProps {
  /** Product long description */
  description: string;
}

/**
 * Component for displaying the product description
 *
 * @param props - The component props
 * @param props.description - Product long description
 * @returns The rendered product information component
 */
export const ProductInformation: React.FC<ProductInformationProps> = ({
  description,
}) => {
  return (
    <div className="border-t border-secondary-200 pt-6">
      <h2 className="text-xl font-semibold mb-4">Product Description</h2>
      <p className="text-secondary-700 whitespace-pre-line mb-6">
        {description}
      </p>
    </div>
  );
};
