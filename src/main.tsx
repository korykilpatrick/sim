import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from '@store/index';
import App from './App';
import './index.css';

// Initialize MSW in development
async function enableMocking() {
  if (process.env.NODE_ENV !== 'production') {
    try {
      const { worker } = await import('./mocks/browser');
      
      // Start the worker with specific options to avoid common errors
      await worker.start({
        serviceWorker: {
          url: '/mockServiceWorker.js',
        },
        onUnhandledRequest: 'bypass', // Don't warn about unhandled requests
      });
      
      console.log('[MSW] Mock Service Worker started successfully');
    } catch (error) {
      console.error('[MSW] Error starting the mock service worker:', error);
    }
  }
}

// Start the mock API before rendering the app
enableMocking().then(() => {
  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </React.StrictMode>,
  );
});