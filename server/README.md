# SIM Backend Server

This backend is designed to be minimal and lightweight, focusing solely on serving mock data with realistic API routes.

## Structure

- `/server/server.ts` - Main server entry point
- `/server/data/index.ts` - Mock data for the backend
- `/server/routes/` - API routes organized by resource
- `/server/types/` - Backend-specific TypeScript types
- `/server/tsconfig.json` - TypeScript configuration for the server

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

For testing authentication:

1.  **Login via API**:
    Use the following credentials with the `/api/auth/login` endpoint:
    - Email: `user@example.com`
    - Password: `password` (Note: The password is not strictly validated in this mock setup, the email is the key.)

2.  **Receive Token**:
    Upon successful login, the API will return a user object and a JWT token. For `user@example.com` (who has user ID '1' in the mock data), the token is `mock-jwt-token-for-user-1`.

3.  **Use Token for Requests**:
    For subsequent requests to protected API routes, include the received token in the `Authorization` header:
    `Authorization: Bearer <your-received-token>`

For example, to access user-specific data, you would first log in to get the token, then use that token in the headers for other API calls.
