import React, { useState } from 'react';
import { useGetUserOrdersQuery } from '@services/ordersApi';
import { useGetCreditsBalanceQuery } from '@services/creditsApi';
import {
  DashboardSidebar,
  ProductFilters,
  ProductGrid,
  DashboardHeader,
  AlertsCard,
} from '@/components/dashboard';
import type { UserProduct, UserProductStatus } from '@shared-types/userProduct';
import type { Order, OrderItem } from '@shared-types/order';
import type { ProductType } from '@shared-types/product';

const DashboardPage: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<ProductType | null>(null);

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

    return ordersData.orders.reduce((acc: UserProduct[], order: Order) => {
      const productsFromOrder: UserProduct[] = order.items.map(
        (item: OrderItem) => {
          // Determine UserProductStatus based on OrderStatus
          let currentStatus: UserProductStatus = 'pending_activation'; // Default
          if (order.status === 'completed') {
            currentStatus = 'active';
          } else if (
            order.status === 'cancelled' ||
            order.status === 'failed' ||
            order.status === 'refunded'
          ) {
            currentStatus = 'cancelled'; // Or map to a more specific UserProductStatus if available
          }
          // Other order statuses like 'pending', 'processing' might map to 'pending_activation' or a custom UserProductStatus

          // Mock expiry for now - ideally, this comes from order data or business logic
          const anHourAgo = new Date(Date.now() - 60 * 60 * 1000);
          const thirtyDaysFromPurchase = order.purchaseDate
            ? new Date(
                new Date(order.purchaseDate).getTime() +
                  30 * 24 * 60 * 60 * 1000,
              )
            : new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); // Fallback if purchaseDate is missing

          return {
            id: `${order.id}-${item.product.id}`, // Composite ID for display
            orderId: order.id,
            productId: item.product.id,
            name: item.product.name,
            type: item.product.type,
            userId: order.userId,
            purchaseDate: order.purchaseDate || anHourAgo.toISOString(), // Ensure purchaseDate is a string
            // activationDate: undefined, // Set if available from order
            expiryDate: thirtyDaysFromPurchase.toISOString(),
            status: currentStatus,
            configuration: item.configurationDetails,
            // lastUpdated: order.lastUpdated, // Set if available
          };
        },
      );
      return [...acc, ...productsFromOrder];
    }, []);
  }, [ordersData]);

  // Filter products based on active filter
  const filteredProducts = React.useMemo(() => {
    if (!activeFilter) return userProducts;
    return userProducts.filter(
      (product: UserProduct) => product.type === activeFilter,
    );
  }, [userProducts, activeFilter]);

  // Get unique product types for filtering
  const productTypes = React.useMemo(() => {
    if (!userProducts.length) return [];
    const types = [
      ...new Set(userProducts.map((product: UserProduct) => product.type)),
    ] as ProductType[];
    return types.map((typeValue: ProductType) => {
      const label = typeValue
        .replace('_', ' ')
        .split(' ')
        .map(
          (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase(),
        )
        .join(' ');
      return { value: typeValue, label };
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
        <DashboardHeader
          isLoading={isOrdersLoading || isCreditsLoading}
          error={ordersError}
        />

        {/* Content */}
        {!isOrdersLoading && !ordersError && (
          <>
            <ProductFilters
              activeFilter={activeFilter}
              onFilterChange={setActiveFilter}
              productTypes={productTypes}
            />

            <ProductGrid
              products={filteredProducts}
              activeFilter={activeFilter}
            />

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
