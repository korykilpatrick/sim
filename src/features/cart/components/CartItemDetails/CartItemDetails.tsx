import { FC } from 'react';

/**
 * Props for the CartItemDetails component
 */
export interface CartItemDetailsProps {
  /** Name of the product */
  productName: string;
  /** Configuration details for the product */
  configurationDetails?: string[];
  /** Total price for this item */
  totalPrice: number;
  /** Total credits cost for this item */
  totalCredits: number;
}

/**
 * Component for displaying product details in a cart item
 *
 * @param props - The component props
 * @param props.productName - Name of the product
 * @param props.configurationDetails - Configuration details for the product
 * @param props.totalPrice - Total price for this item
 * @param props.totalCredits - Total credits cost for this item
 * @returns The rendered product details component
 */
export const CartItemDetails: FC<CartItemDetailsProps> = ({
  productName,
  configurationDetails,
  totalPrice,
  totalCredits,
}) => {
  return (
    <div>
      <h3 className="text-lg font-medium text-secondary-900">{productName}</h3>
      
      {configurationDetails && configurationDetails.length > 0 && (
        <div className="mt-1 text-sm text-secondary-500">
          <p className="font-medium">Configuration:</p>
          <ul className="list-disc pl-5 mt-1">
            {configurationDetails.map((detail, index) => (
              <li key={index}>{detail}</li>
            ))}
          </ul>
        </div>
      )}
      
      <div className="mt-2 flex items-center">
        <span className="text-secondary-900 font-medium">${totalPrice.toFixed(2)}</span>
        {totalCredits > 0 && (
          <span className="ml-3 text-sm text-ocean-600">
            {totalCredits} credit{totalCredits !== 1 ? 's' : ''}
          </span>
        )}
      </div>
    </div>
  );
};
