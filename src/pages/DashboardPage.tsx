import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useGetUserOrdersQuery } from '@services/ordersApi';
import { useGetCreditsBalanceQuery } from '@services/creditsApi';
import { DashboardSidebar } from '@components/dashboard/DashboardSidebar';
import { ProductCard } from '@components/dashboard/ProductCard';
import { AlertsCard } from '@components/dashboard/AlertsCard';
import { Button } from '@components/common/Button';
import { Spinner } from '@components/common/Spinner';
import { Alert } from '@components/common/Alert';

const DashboardPage: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<string | null>(null);

  // Fetch user orders and purchased products
  const {
    data: ordersData,
    isLoading: isOrdersLoading,
    error: ordersError,
  } = useGetUserOrdersQuery();

  // Fetch credit balance
  const { isLoading: isCreditsLoading } = useGetCreditsBalanceQuery();

  // Process orders into purchased products
  const userProducts = React.useMemo(() => {
    if (!ordersData || !ordersData.orders) return [];

    // Flatten products from all orders
    return ordersData.orders.reduce((acc: any[], order: any) => {
      // Add products from this order to the list
      const products = order.items.map((item: any) => ({
        id: `${order.id}-${item.product.id}`,
        productId: item.product.id,
        name: item.product.name,
        type: item.product.type,
        purchaseDate: order.purchaseDate,
        expiryDate: new Date(
          new Date(order.purchaseDate).getTime() + 30 * 24 * 60 * 60 * 1000,
        ).toISOString(), // Mock 30 days expiry
        status: 'active',
        configuration: item.configurationDetails,
      }));

      return [...acc, ...products];
    }, []);
  }, [ordersData]);

  // Filter products based on active filter
  const filteredProducts = React.useMemo(() => {
    if (!activeFilter) return userProducts;
    return userProducts.filter((product) => product.type === activeFilter);
  }, [userProducts, activeFilter]);

  // Get unique product types for filtering
  const productTypes = React.useMemo(() => {
    if (!userProducts.length) return [];
    const types = [...new Set(userProducts.map((product) => product.type))];
    return types.map((type) => {
      const label = type
        .replace('_', ' ')
        .split(' ')
        .map(
          (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase(),
        )
        .join(' ');

      return { value: type, label };
    });
  }, [userProducts]);

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      {/* Sidebar */}
      <div className="lg:w-64 w-full flex-shrink-0">
        <DashboardSidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1">
        <h1 className="text-2xl font-bold mb-6">My Products</h1>

        {/* Loading state */}
        {(isOrdersLoading || isCreditsLoading) && (
          <div className="flex justify-center py-12">
            <Spinner size="lg" />
          </div>
        )}

        {/* Error state */}
        {ordersError && (
          <Alert
            variant="error"
            title="Error loading your products"
            message="There was an error loading your purchased products. Please try again later."
            className="mb-6"
          />
        )}

        {/* Content */}
        {!isOrdersLoading && !ordersError && (
          <>
            {/* Filter tabs */}
            {productTypes.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                <button
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    activeFilter === null
                      ? 'bg-primary-100 text-primary-800'
                      : 'bg-secondary-100 text-secondary-700 hover:bg-secondary-200'
                  }`}
                  onClick={() => setActiveFilter(null)}
                >
                  All Products
                </button>

                {productTypes.map((type) => (
                  <button
                    key={type.value}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                      activeFilter === type.value
                        ? 'bg-primary-100 text-primary-800'
                        : 'bg-secondary-100 text-secondary-700 hover:bg-secondary-200'
                    }`}
                    onClick={() => setActiveFilter(type.value)}
                  >
                    {type.label}
                  </button>
                ))}
              </div>
            )}

            {/* Products grid */}
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow p-8 text-center mb-8">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-12 w-12 mx-auto text-secondary-400 mb-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                  />
                </svg>

                <h2 className="text-xl font-medium text-secondary-900 mb-2">
                  {activeFilter
                    ? 'No products of this type'
                    : 'No products yet'}
                </h2>

                <p className="text-secondary-600 mb-6">
                  {activeFilter
                    ? "You don't have any products of this type. Try selecting a different filter or browse the marketplace."
                    : "You haven't purchased any products yet. Browse our marketplace to get started."}
                </p>

                <Link to="/marketplace">
                  <Button variant="primary">Browse Marketplace</Button>
                </Link>
              </div>
            )}

            {/* Alerts section */}
            <div className="mb-8">
              <AlertsCard />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;
