import { RouterProvider } from 'react-router-dom';
// import { Toaster } from 'react-hot-toast'; // Erroneously added, will be removed
// import { GlobalStyles } from '@app/GlobalStyles'; // Removed
import { router } from '@app/router';

/**
 * Main application component that sets up the router
 *
 * @returns The router provider component with the application routes
 */
function App() {
  return (
    <>
      {/* <GlobalStyles /> */}{/* Removed */}
      <RouterProvider router={router} />
      {/* <Toaster /> */}{/* Erroneously added, will be removed */}
    </>
  );
}

export default App;
