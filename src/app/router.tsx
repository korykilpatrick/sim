import { createBrowserRouter, Navigate } from 'react-router-dom';
import { MainLayout } from '@components/layout/MainLayout';
import { AuthLayout } from '@components/layout/AuthLayout';
import { ProtectedRoute } from '@components/layout/ProtectedRoute';

import { LoginPage } from '@pages/login-page';
import { RegisterPage } from '@pages/register-page';
import { NotFoundPage } from '@pages/not-found-page';
import { MarketplacePage } from '@pages/marketplace-page';
import { ProductDetailsPage } from '@pages/product-details-page';
import { ProductConfigPage } from '@pages/product-config-page';
import CartPage from '@pages/cart-page';
import { CheckoutPage } from '@pages/checkout-page';
import { PaymentConfirmationPage } from '@pages/payment-confirmation-page';
import { DashboardPage } from '@pages/dashboard-page';
import { ReportsPage } from '@pages/reports-page';
import { UserSettingsPage } from '@pages/user-settings-page';

const AMSGuiPage = () => <div>AMS GUI Page</div>;
const FTSGuiPage = () => <div>FTS GUI Page</div>;
const RFIFormPage = () => <div>RFI Form Page</div>;

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Navigate to="/marketplace" replace />,
      },
      {
        path: 'marketplace',
        element: <MarketplacePage />,
      },
      {
        path: 'products/:productId',
        element: <ProductDetailsPage />,
      },
      {
        path: 'protected',
        element: <ProtectedRoute />,
        children: [
          {
            path: 'configure/:productId',
            element: <ProductConfigPage />,
          },
          {
            path: 'cart',
            element: <CartPage />,
          },
          {
            path: 'checkout',
            element: <CheckoutPage />,
          },
          {
            path: 'confirmation',
            element: <PaymentConfirmationPage />,
          },
          {
            path: 'dashboard',
            element: <DashboardPage />,
          },
          {
            path: 'reports',
            element: <ReportsPage />,
          },
          {
            path: 'ams/:id',
            element: <AMSGuiPage />,
          },
          {
            path: 'fts/:id',
            element: <FTSGuiPage />,
          },
          {
            path: 'investigations/rfi',
            element: <RFIFormPage />,
          },
          {
            path: 'settings',
            element: <UserSettingsPage />,
          },
        ],
      },
    ],
  },
  {
    path: '/auth',
    element: <AuthLayout />,
    children: [
      {
        index: true,
        element: <Navigate to="/auth/login" replace />,
      },
      {
        path: 'login',
        element: <LoginPage />,
      },
      {
        path: 'register',
        element: <RegisterPage />,
      },
    ],
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
]);
