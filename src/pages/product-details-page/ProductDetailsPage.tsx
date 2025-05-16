import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useGetProductQuery } from '@features/products/productsApi';
import { useAppDispatch, useAppSelector } from '@hooks/useAppRedux';
import { addItem } from '@features/cart/cartSlice';
import { v4 as uuidv4 } from 'uuid';
import { Spinner, Alert } from '@components/ui';
import { ProductImageGallery, ProductPricing } from '@features/products/components';
import { ProductHeader } from '@features/products/components/ProductHeader';
import { ProductInformation } from '@features/products/components/ProductInformation';
import { ProductSpecialFeatures } from '@features/products/components/ProductSpecialFeatures';
import { MaritimeAlertProduct } from '@shared-types/product';

/**
 * Component for displaying detailed product information and purchase options
 *
 * @returns The rendered product details page with image gallery, pricing, and information
 */
export const ProductDetailsPage: React.FC = () => {
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

  };

  const handleBuyNow = () => {
    if (!product) return;

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
        navigate('/auth/login', {
          state: { from: `/protected/configure/${product.id}` },
        });
      }
      return;
    }

    dispatch(
      addItem({
        itemId: uuidv4(),
        product,
        quantity: 1,
      }),
    );

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

  const isMaritimeAlert = product.type === 'MARITIME_ALERT';
  const maritimeAlertProduct = isMaritimeAlert
    ? (product as MaritimeAlertProduct)
    : null;

  return (
    <div>
      <ProductHeader
        name={product.name}
        tags={product.tags}
        onBack={() => navigate(-1)}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Product Image */}
        <div className="lg:col-span-2">
          <ProductImageGallery
            mainImage={product.imageUrl || undefined}
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
            <ProductInformation description={product.longDescription} />

            {/* Special features for Maritime Alert products */}
            {isMaritimeAlert && maritimeAlertProduct && (
              <ProductSpecialFeatures product={maritimeAlertProduct} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
