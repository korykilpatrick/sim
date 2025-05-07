import React from 'react';
import { Link } from 'react-router-dom';
import { useGetUserOrdersQuery } from '@services/ordersApi';
import { DashboardSidebar } from '@components/dashboard/DashboardSidebar';
import { Button } from '@components/common/Button';
import { Spinner } from '@components/common/Spinner';
import { Alert } from '@components/common/Alert';

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
        .filter((item: any) => 
          item.product.type === 'REPORT_COMPLIANCE' || 
          item.product.type === 'REPORT_CHRONOLOGY'
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
        
        {/* Loading state */}
        {isLoading && (
          <div className="flex justify-center py-12">
            <Spinner size="lg" />
          </div>
        )}
        
        {/* Error state */}
        {error && (
          <Alert
            variant="error"
            title="Error loading reports"
            message="There was an error loading your reports. Please try again later."
            className="mb-6"
          />
        )}
        
        {/* Content */}
        {!isLoading && !error && (
          <>
            {reports.length > 0 ? (
              <div className="bg-white rounded-lg shadow overflow-hidden">
                <div className="p-6 border-b border-secondary-200">
                  <h2 className="text-lg font-medium text-secondary-900">Your Reports</h2>
                  <p className="text-sm text-secondary-500 mt-1">
                    Access your purchased reports
                  </p>
                </div>
                
                <div className="divide-y divide-secondary-200">
                  {reports.map(report => (
                    <div key={report.id} className="p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center">
                      <div>
                        <h3 className="font-medium text-secondary-900">{report.name}</h3>
                        <p className="text-sm text-secondary-500 mt-1">
                          {report.type === 'REPORT_COMPLIANCE' ? 'Vessel Compliance Report' : 'Vessel Chronology Report'}
                        </p>
                        <p className="text-sm text-secondary-500 mt-1">
                          Purchased on {new Date(report.purchaseDate).toLocaleDateString()}
                        </p>
                      </div>
                      
                      <div className="mt-4 sm:mt-0">
                        <Button
                          variant="primary"
                          size="sm"
                        >
                          Download Report
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow p-8 text-center">
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
                    d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                
                <h2 className="text-xl font-medium text-secondary-900 mb-2">No reports yet</h2>
                <p className="text-secondary-600 mb-6">
                  You haven't purchased any reports yet. Visit our marketplace to get started.
                </p>
                
                <Link to="/marketplace">
                  <Button variant="primary">Browse Marketplace</Button>
                </Link>
              </div>
            )}
            
            <div className="bg-white rounded-lg shadow overflow-hidden mt-8">
              <div className="p-6 border-b border-secondary-200">
                <h2 className="text-lg font-medium text-secondary-900">Request Custom Report</h2>
                <p className="text-sm text-secondary-500 mt-1">
                  Need specialized information or analysis? Request a custom report.
                </p>
              </div>
              
              <div className="p-6">
                <p className="text-secondary-600 mb-4">
                  Our team can create custom reports tailored to your specific needs. Contact us to discuss your requirements.
                </p>
                
                <Link to="/protected/investigations/rfi">
                  <Button variant="primary">Request Custom Report</Button>
                </Link>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ReportsPage;