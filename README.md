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
- **Mock Service Worker (MSW)**: For API mocking

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

Start the development server:

```bash
npm run dev
```

This will start the app at http://localhost:3009.

### Building for Production

```bash
npm run build
```

This will create a production-ready build in the `dist` directory.

## Project Structure

```
src/
├── assets/                # Static assets (images, icons, fonts)
├── components/            # Reusable UI components
│   ├── common/            # Generic components (Button, Input, Modal, Card)
│   ├── layout/            # Layout components (Header, Sidebar, Footer)
│   ├── products/          # Product-related components
│   ├── cart/              # Shopping cart components
│   ├── dashboard/         # Dashboard components
│   └── productConfig/     # Product configuration forms
├── features/              # Feature-specific components and logic
├── hooks/                 # Custom React hooks
├── mocks/                 # Mock server implementation (MSW)
│   ├── handlers/          # MSW request handlers
│   └── data/              # Mock data
├── pages/                 # Top-level route components
├── services/              # RTK Query API definitions
├── store/                 # Redux store configuration
│   └── slices/            # Redux feature slices
├── types/                 # TypeScript type definitions
├── utils/                 # Utility functions
├── App.tsx                # Main application component
└── main.tsx               # Application entry point
```

## Mock API

The application uses Mock Service Worker (MSW) to simulate backend functionality. This allows the app to function without a real backend, while still providing realistic API interactions.

The mock API includes handlers for:
- Authentication (login, register)
- Products (listing, details)
- Cart operations
- Orders and checkout
- User dashboard data
- Alerts and notifications

## Authentication

For testing, you can use the following credentials:

- Email: user@example.com
- Password: password

Or register a new account (no email verification required in the mock implementation).

## Notes

This is a frontend-only implementation and doesn't include actual payment processing, data persistence, or real-time data. In a production environment, the MSW layer would be replaced with calls to a real backend API.