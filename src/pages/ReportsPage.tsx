import React from 'react';
import { useGetUserOrdersQuery } from '@features/orders/ordersApi';
import { DashboardSidebar } from '@features/dashboard';
import { ReportsList, CustomReportRequestCard } from '@features/reports';

/**
 * Reports page component
 *
 * @returns The rendered reports page with reports list and custom report request card
 */
const ReportsPage: React.FC = () => {
  // Fetch user orders
  const { data: ordersData, isLoading, error } = useGetUserOrdersQuery();

  // Extract reports from orders
  const reports = React.useMemo(() => {
    if (!ordersData || !ordersData.orders) return [];

    // Flatten products from all orders and filter to only include reports
    return ordersData.orders.reduce((acc: any[], order: any) => {
      // Add report products from this order to the list
      const reportProducts = order.items
        .filter(
          (item: any) =>
            item.product.type === 'REPORT_COMPLIANCE' ||
            item.product.type === 'REPORT_CHRONOLOGY',
        )
        .map((item: any) => ({
          id: `${order.id}-${item.product.id}`,
          productId: item.product.id,
          name: item.product.name,
          type: item.product.type,
          purchaseDate: order.purchaseDate,
          status: 'completed',
          configuration: item.configurationDetails,
        }));

      return [...acc, ...reportProducts];
    }, []);
  }, [ordersData]);

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      {/* Sidebar */}
      <div className="lg:w-64 w-full flex-shrink-0">
        <DashboardSidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1">
        <h1 className="text-2xl font-bold mb-6">Reports</h1>

        <div className="space-y-8">
          <ReportsList reports={reports} isLoading={isLoading} error={error} />

          <CustomReportRequestCard />
        </div>
      </div>
    </div>
  );
};

export default ReportsPage;
