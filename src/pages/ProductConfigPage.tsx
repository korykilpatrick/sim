import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useGetProductQuery } from '@services/productsApi';
import { MaritimeAlertProduct } from '@shared-types/product';
import { VesselTrackingConfig } from '@components/productConfig/VesselTrackingConfig';
import { AreaMonitoringConfig } from '@components/productConfig/AreaMonitoringConfig';
import { MaritimeAlertConfig } from '@components/productConfig/MaritimeAlertConfig';
import { ReportConfig } from '@components/productConfig/ReportConfig';
import { InvestigationRFIForm } from '@components/productConfig/InvestigationRFIForm';
import { Spinner, Alert, Button } from '@components/common';

/**
 * Component for configuring product options before purchase
 *
 * @returns The rendered product configuration page with appropriate form based on product type
 */
const ProductConfigPage: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();

  const { data, isLoading, error } = useGetProductQuery(productId || '');

  if (isLoading) {
    return (
      <div className="flex justify-center py-12">
        <Spinner size="lg" />
      </div>
    );
  }

  if (error || !data?.product) {
    return (
      <div className="space-y-6">
        <Alert
          variant="error"
          title="Error loading product"
          message="The product you're trying to configure could not be found or is currently unavailable."
        />
        <div className="flex justify-center">
          <Button variant="primary" onClick={() => navigate('/marketplace')}>
            Back to Marketplace
          </Button>
        </div>
      </div>
    );
  }

  const product = data.product;

  // Render the appropriate configuration form based on product type
  const renderConfigForm = () => {
    switch (product.type) {
      case 'VTS':
        return <VesselTrackingConfig product={product} />;

      case 'AMS':
        return <AreaMonitoringConfig product={product} />;

      case 'MARITIME_ALERT':
        return (
          <MaritimeAlertConfig product={product as MaritimeAlertProduct} />
        );

      case 'REPORT_COMPLIANCE':
      case 'REPORT_CHRONOLOGY':
        return <ReportConfig product={product} />;

      case 'INVESTIGATION':
        return <InvestigationRFIForm product={product} />;

      default:
        return (
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <h2 className="text-xl font-medium text-secondary-900 mb-2">
              No Configuration Required
            </h2>
            <p className="text-secondary-600 mb-6">
              This product doesn&apos;t require any configuration and can be
              purchased directly.
            </p>
            <div className="flex justify-center space-x-4">
              <Link to={`/products/${product.id}`}>
                <Button variant="outline">Back to Product</Button>
              </Link>
              <Link to="/protected/cart">
                <Button variant="primary">Go to Cart</Button>
              </Link>
            </div>
          </div>
        );
    }
  };

  return (
    <div>
      <div className="mb-8">
        <Link
          to={`/products/${product.id}`}
          className="inline-flex items-center text-primary-600 hover:text-primary-800"
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
          Back to Product
        </Link>
      </div>

      {renderConfigForm()}
    </div>
  );
};

export default ProductConfigPage;
