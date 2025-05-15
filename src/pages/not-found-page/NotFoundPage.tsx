import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@components/ui/Button';

/**
 * Component for displaying a 404 page when a route is not found
 *
 * @returns The rendered 404 page with navigation options
 */
export const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-secondary-50 flex flex-col justify-center items-center px-4 py-16">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-primary-600">404</h1>
        <h2 className="text-3xl font-bold mt-4 mb-8 text-secondary-900">
          Page Not Found
        </h2>
        <p className="text-secondary-600 max-w-md mx-auto mb-8">
          The page you are looking for doesn&apos;t exist or has been moved.
        </p>
        <div className="flex justify-center space-x-4">
          <Link to="/">
            <Button variant="primary">Back to Home</Button>
          </Link>
          <Link to="/marketplace">
            <Button variant="outline">Go to Marketplace</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
