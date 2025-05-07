import { Outlet } from 'react-router-dom';

export const AuthLayout = () => {
  return (
    <div className="flex min-h-screen bg-secondary-100">
      <div className="m-auto w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold text-primary-600">SynMax Intelligence Marketplace</h1>
        </div>
        <Outlet />
      </div>
    </div>
  );
};