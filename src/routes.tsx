import { createBrowserRouter, Navigate } from 'react-router-dom';
import { MainLayout } from '@components/layout/MainLayout';
import { AuthLayout } from '@components/layout/AuthLayout';
import { ProtectedRoute } from '@components/layout/ProtectedRoute';

// Import pages
import LoginPage from '@pages/LoginPage';
import RegisterPage from '@pages/RegisterPage';
import NotFoundPage from '@pages/NotFoundPage';
import MarketplacePage from '@pages/MarketplacePage';
import ProductDetailsPage from '@pages/ProductDetailsPage';
import ProductConfigPage from '@pages/ProductConfigPage';
import CartPage from '@pages/CartPage';
import CheckoutPage from '@pages/CheckoutPage';
import PaymentConfirmationPage from '@pages/PaymentConfirmationPage';
import DashboardPage from '@pages/DashboardPage';
import ReportsPage from '@pages/ReportsPage';
import UserSettingsPage from '@pages/UserSettingsPage';

// Pages will be implemented later
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