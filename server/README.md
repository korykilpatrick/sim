# SIM Backend Server

This backend is designed to be minimal and lightweight, focusing solely on serving mock data with realistic API routes.

## Structure

- `/server/server.ts` - Main server entry point
- `/server/data/index.ts` - Mock data copied from MSW
- `/server/routes/` - API routes organized by resource

## How to Run

### Install Dependencies

```bash
npm install
```

### Start the Backend Server Only

```bash
npm run server
```

This will start the backend server on http://localhost:3001.

### Start Both Frontend and Backend

```bash
npm run dev:full
```

This will start both the backend server and the Vite development server concurrently.

## API Routes

The server implements the following API endpoints:

- `/api/products` - Product listing and details
- `/api/auth` - Authentication (login, register, session)
- `/api/cart` - Shopping cart management
- `/api/orders` - Order creation and history
- `/api/alerts` - User alert notifications
- `/api/credits` - Credit management
- `/api/rfi` - Request for Information

## Deployment

For production deployment:

1. Build the frontend: `npm run build`
2. Deploy the backend to your server
3. Configure your server to serve the static frontend files
4. Update the API URL in `.env.production` if needed

## Authentication

For simplicity, the backend uses a hardcoded JWT token for authentication:

- Email: `user@example.com`
- Token: `mock-jwt-token-for-user-1`
