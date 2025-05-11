import { RouterProvider } from 'react-router-dom';
import { router } from './routes';

/**
 * Main application component that sets up the router
 * 
 * @returns The router provider component with the application routes
 */
function App() {
  return <RouterProvider router={router} />;
}

export default App;
