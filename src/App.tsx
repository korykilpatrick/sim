import { RouterProvider } from 'react-router-dom';
import { router } from '@app/router';
import { GlobalStyles } from '@app/GlobalStyles';

/**
 * Main application component that sets up the router
 *
 * @returns The router provider component with the application routes
 */
function App() {
  return (
    <>
      <GlobalStyles />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
