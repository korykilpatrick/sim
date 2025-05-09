import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useGetProductQuery } from '@services/productsApi';
import { useAppDispatch, useAppSelector } from '@hooks/redux';
import { addItem } from '@store/slices/cartSlice';
import { v4 as uuidv4 } from 'uuid';
import { Badge } from '@components/common/Badge';
import { Spinner } from '@components/common/Spinner';
import { Alert } from '@components/common/Alert';
import { ProductImageGallery } from '@components/products/ProductImageGallery';
import { ProductPricing } from '@components/products/ProductPricing';
import { MaritimeAlertProduct } from '@shared-types/product';

const ProductDetailsPage: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  const { data, isLoading, error } = useGetProductQuery(productId || '');

  const product = data?.product;

  const handleAddToCart = () => {
    if (!product) return;

    dispatch(
      addItem({
        itemId: uuidv4(),
        product,
        quantity: 1,
      }),
    );

    // Show a success notification or open a modal here if desired
  };

  const handleBuyNow = () => {
    if (!product) return;

    // If product requires configuration, redirect to configuration page first
    if (
      product.type === 'MARITIME_ALERT' ||
      product.type === 'VTS' ||
      product.type === 'AMS' ||
      product.type === 'FTS' ||
      product.type === 'REPORT_COMPLIANCE' ||
      product.type === 'REPORT_CHRONOLOGY'
    ) {
      if (isAuthenticated) {
        navigate(`/protected/configure/${product.id}`);
      } else {
        // Redirect to login if not authenticated
        navigate('/auth/login', {
          state: { from: `/protected/configure/${product.id}` },
        });
      }
      return;
    }

    // Add to cart and go to checkout
    dispatch(
      addItem({
        itemId: uuidv4(),
        product,
        quantity: 1,
      }),
    );

    // Redirect to cart or checkout
    if (isAuthenticated) {
      navigate('/protected/checkout');
    } else {
      navigate('/auth/login', { state: { from: '/protected/checkout' } });
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Spinner size="lg" />
      </div>
    );
  }

  if (error || !product) {
    return (
      <Alert
        variant="error"
        title="Error loading product"
        message="The product you are looking for could not be found or is currently unavailable."
      />
    );
  }

  // Extract info if this is a MaritimeAlert product
  const isMaritimeAlert = product.type === 'MARITIME_ALERT';
  const maritimeAlertProduct = isMaritimeAlert
    ? (product as MaritimeAlertProduct)
    : null;

  return (
    <div>
      <div className="mb-8">
        <a
          onClick={() => navigate(-1)}
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Product Image */}
        <div className="lg:col-span-2">
          <ProductImageGallery
            mainImage={product.imageUrl}
            alt={product.name}
          />
        </div>

        {/* Product Details and Pricing */}
        <div>
          <ProductPricing
            product={product}
            onAddToCart={handleAddToCart}
            onBuyNow={handleBuyNow}
          />
        </div>

        {/* Product Information */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-secondary-900 mb-2">
                {product.name}
              </h1>

              <div className="flex flex-wrap gap-2 mt-3">
                {product.tags?.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="border-t border-secondary-200 pt-6">
              <h2 className="text-xl font-semibold mb-4">
                Product Description
              </h2>
              <p className="text-secondary-700 whitespace-pre-line mb-6">
                {product.longDescription}
              </p>

              {/* Special features for Maritime Alert products */}
              {isMaritimeAlert && maritimeAlertProduct && (
                <div className="mt-6">
                  <h3 className="text-lg font-medium mb-3">
                    Alert Types Available
                  </h3>
                  <ul className="list-disc list-inside space-y-2 text-secondary-700">
                    {maritimeAlertProduct.alertTypesAvailable.map(
                      (alertType) => (
                        <li key={alertType}>
                          {alertType === 'SHIP' &&
                            'Ship-based alerts - Track specific vessels'}
                          {alertType === 'AREA' &&
                            'Area-based alerts - Monitor defined geographical areas'}
                          {alertType === 'SHIP_AND_AREA' &&
                            'Combined ship and area monitoring'}
                        </li>
                      ),
                    )}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;
