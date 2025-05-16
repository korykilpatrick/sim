import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useGetProductQuery } from '@services/productsApi';
import { useAppDispatch, useAppSelector } from '@hooks/redux';
import { addItem } from '@features/cart/cartSlice';
import { v4 as uuidv4 } from 'uuid';
import { Spinner, Alert } from '@components/common';
import { ProductImageGallery, ProductPricing } from '@components/products';
import { ProductHeader } from '../components/products/ProductHeader';
import { ProductInformation } from '../components/products/ProductInformation';
import { ProductSpecialFeatures } from '../components/products/ProductSpecialFeatures';
import { MaritimeAlertProduct } from '@shared-types/product';

/**
 * Component for displaying detailed product information and purchase options
 *
 * @returns The rendered product details page with image gallery, pricing, and information
 */
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

export default ProductDetailsPage;
