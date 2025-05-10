import React from 'react';
import { Link } from 'react-router-dom';
import { BaseProduct } from '@shared-types/product';
import { Badge, Button } from '@components/common';

type ProductCardProps = {
  product: BaseProduct;
};

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { id, name, shortDescription, price, creditCost, imageUrl, tags } =
    product;

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden transition-all hover:shadow-md">
      <div className="h-48 bg-secondary-200 overflow-hidden">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-secondary-100 text-secondary-400">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>
        )}
      </div>

      <div className="p-4">
        <h3 className="text-lg font-semibold text-secondary-900 mb-1">
          {name}
        </h3>

        <p
          className="text-secondary-600 text-sm mb-3 line-clamp-2"
          style={{ minHeight: '2.5rem' }}
        >
          {shortDescription}
        </p>

        <div className="flex flex-wrap gap-1 mb-3">
          {tags &&
            tags.map((tag) => (
              <Badge key={tag} variant="secondary" size="sm">
                {tag}
              </Badge>
            ))}
        </div>

        <div className="flex justify-between items-center mt-4">
          <div>
            <p className="text-primary-600 font-bold">${price.toFixed(2)}</p>
            <p className="text-xs text-secondary-500">
              or {creditCost} credits
            </p>
          </div>

          <Link to={`/products/${id}`}>
            <Button variant="primary" size="sm">
              Learn more
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
