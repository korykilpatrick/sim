# SynMax Intelligence Marketplace (SIM)

SIM is a self-service e-commerce platform enabling customers in the maritime industry to purchase SynMax's data and analytics products on a pay-as-you-go basis.

## Project Overview

The SynMax Intelligence Marketplace (SIM) frontend provides a user-friendly interface for purchasing maritime intelligence products, including:

- Vessel Tracking Services (VTS)
- Area Monitoring Services (AMS)
- Fleet Tracking Services (FTS)
- Vessel Compliance Reports
- Vessel Chronology Reports
- Maritime Investigations

## Features

- Product browsing and discovery
- Detailed product configuration
- Shopping cart functionality
- Checkout and payment processing
- User dashboard for purchased products
- Product management and monitoring

## Tech Stack

- **React 18+**: For component-based UI development
- **TypeScript**: For type safety
- **Vite**: For fast development and optimized builds
- **Tailwind CSS**: For utility-first styling
- **Redux Toolkit**: For state management
- **RTK Query**: For data fetching and caching
- **React Router**: For navigation
- **React Hook Form**: For form management
- **Zod**: For schema validation
- **Express**: For the lightweight backend API

## Getting Started

### Prerequisites

- Node.js 16+
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

### Development

You have two options to start the application:

1. Start the frontend development server only:

```bash
npm run dev
```

2. Start both the frontend and the Express backend:

```bash
npm run dev:full
```

The frontend will be available at http://localhost:3009 (or whichever port Vite selects).
The backend API will be available at http://localhost:3001.

### Building for Production

```bash
npm run build
```

This will create a production-ready build in the `dist` directory.

## Project Structure

```
├── server/                # Express backend server
│   ├── data/              # Mock data for the backend
│   ├── routes/            # API route handlers
│   └── server.ts          # Main server entry point
├── src/
│   ├── assets/            # Static assets (images, icons, fonts)
│   ├── components/        # Reusable UI components
│   │   ├── alerts/        # Alert-related components
│   │   ├── auth/          # Authentication components
│   │   ├── cart/          # Shopping cart components
│   │   ├── common/        # Generic components (Button, Input, Modal, Card)
│   │   ├── dashboard/     # Dashboard components
│   │   ├── layout/        # Layout components (Header, Sidebar, Footer)
│   │   ├── map/           # Map-related components
│   │   ├── maritime/      # Maritime-specific components
│   │   ├── productConfig/ # Product configuration forms
│   │   └── products/      # Product-related components
│   ├── hooks/             # Custom React hooks
│   ├── pages/             # Top-level route components
│   ├── services/          # RTK Query API definitions
│   ├── store/             # Redux store configuration
│   │   └── slices/        # Redux feature slices
│   ├── types/             # TypeScript type definitions
│   ├── utils/             # Utility functions
│   ├── App.tsx            # Main application component
│   └── main.tsx           # Application entry point
```

## Backend API

The application includes a lightweight Express backend that serves mock data through realistic API endpoints. This backend replaces the previous Mock Service Worker (MSW) implementation for production use, while still maintaining the same data and behavior.

The backend API includes endpoints for:

- Authentication (login, register)
- Products (listing, details)
- Cart operations
- Orders and checkout
- User dashboard data
- Alerts and notifications
- Request for Information (RFI)

See the `server/README.md` file for more details on the backend implementation.

## Authentication

For testing, you can use the following credentials:

- Email: user@example.com
- Password: password

Or register a new account (no email verification required in the implementation).

## Notes

This implementation uses mock data and doesn't include actual payment processing, data persistence, or real-time data. In a full production environment, you would replace the mock data with connections to your actual data sources and services.
