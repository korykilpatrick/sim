import React from 'react';
import { BaseProduct } from '@shared-types/product';
import { ProductCardImage } from './ProductCardImage';
import { ProductCardInfo } from './ProductCardInfo';
import { ProductCardTags } from './ProductCardTags';
import { ProductCardPricing } from './ProductCardPricing';
import { ProductCardActions } from './ProductCardActions';

/**
 * Props for the ProductCard component
 */
export interface ProductCardProps {
  /** Product data */
  product: BaseProduct;
}

/**
 * Component for displaying a product card with image, info, tags, pricing, and actions
 *
 * @param props - The component props
 * @param props.product - Product data to display
 * @returns The rendered product card component
 */
export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { id, name, shortDescription, price, creditCost, imageUrl, tags } =
    product;

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden transition-all hover:shadow-md">
      <ProductCardImage imageUrl={imageUrl} name={name} />

      <div className="p-4">
        <ProductCardInfo name={name} shortDescription={shortDescription} />
        <ProductCardTags tags={tags} />

        <div className="flex justify-between items-center mt-4">
          <ProductCardPricing price={price} creditCost={creditCost} />
          <ProductCardActions productId={id} />
        </div>
      </div>
    </div>
  );
};
