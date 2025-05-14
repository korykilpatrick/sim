import React from 'react';
import { Badge } from '../common';

/**
 * Props for the ProductHeader component
 */
export interface ProductHeaderProps {
  /** Product name */
  name: string;
  /** Product tags */
  tags?: string[] | undefined;
  /** Function to navigate back */
  onBack: () => void;
}

/**
 * Component for displaying the product header with title, tags, and back button
 *
 * @param props - The component props
 * @param props.name - Product name
 * @param props.tags - Product tags
 * @param props.onBack - Function to navigate back
 * @returns The rendered product header component
 */
export const ProductHeader: React.FC<ProductHeaderProps> = ({
  name,
  tags,
  onBack,
}) => {
  return (
    <>
      <div className="mb-8">
        <a
          onClick={onBack}
          className="inline-flex items-center text-primary-600 hover:text-primary-800 cursor-pointer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          Back
        </a>
      </div>

      <div className="mb-6">
        <h1 className="text-3xl font-bold text-secondary-900 mb-2">{name}</h1>

        <div className="flex flex-wrap gap-2 mt-3">
          {tags?.map((tag) => (
            <Badge key={tag} variant="secondary">
              {tag}
            </Badge>
          ))}
        </div>
      </div>
    </>
  );
};
