Okay, I've compared both PRDs and your notes. Here's a combined and refined Technical PRD for the SynMax Intelligence Marketplace (SIM) frontend, incorporating the best aspects of both and adhering to your specified exclusions.

## SynMax Intelligence Marketplace (SIM) - Final Technical PRD

**1. Project Overview**

**1.1 Introduction**
The SynMax Intelligence Marketplace (SIM) is a self-service e-commerce platform enabling customers in the maritime industry to purchase SynMax's data and analytics products on a pay-as-you-go basis. This technical PRD outlines the frontend implementation requirements for building a scalable, user-friendly interface based on the provided Figma designs. The project focuses solely on the frontend, utilizing mocked API interactions to simulate backend behavior, ensuring a real backend can be integrated seamlessly later.

**1.2 Scope**
This document covers the frontend development specifications for SIM. Key aspects include:

- Implementing all user interface elements and flows detailed in the Figma mockups.
- Developing a responsive user experience for product discovery, configuration, purchase, and management.
- Building a robust mock API layer using Mock Service Worker (MSW) that can be easily replaced with actual backend endpoints.
- Supporting both credits-based and direct checkout-based transaction models from a UI perspective.

**1.3 Objectives**

- Create an intuitive and responsive user interface tailored for maritime industry professionals.
- Implement efficient state management for the product catalog, user sessions, shopping cart, and user-owned assets (like alerts and reports).
- Develop a modular and maintainable codebase using React, TypeScript, and Redux Toolkit.
- Ensure clear API contracts are defined through RTK Query for future backend integration.

**1.4 Non-Goals**

- Backend development (database, server-side logic, actual payment processing, email sending).
- User data storage beyond session/local storage for frontend state persistence (e.g., cart, UI preferences).
- Implementation of accessibility features (A11y).
- Internationalization (i18n) support.
- Formal testing suites (unit, integration, E2E tests).
- CI/CD pipeline setup.
- Deployment strategy and hosting infrastructure.
- Real-time communication infrastructure beyond simulated polling for alerts.

**2. Technical Stack**

**2.1 Core Technologies**

- **React 18+:** For component-based UI development.
- **TypeScript:** For type safety and improved developer experience.
- **Vite:** For fast development and optimized production builds.
- **Tailwind CSS:** For utility-first styling and responsive design.

**2.2 State Management**

- **Redux Toolkit:** For global state management (e.g., auth, cart, UI state).
- **RTK Query:** For data fetching, caching, and managing server state (products, alerts, etc.).

**2.3 Additional Libraries**

- **React Router (v6+):** For application routing and navigation.
- **React Hook Form:** For efficient and maintainable form validation and submission.
- **Zod:** For schema definition and validation, usable with React Hook Form.
- **Chart.js / Recharts (or similar):** For any data visualization components required (e.g., in dashboards, AMS/FTS GUIs if complex visualizations are needed beyond basic mapping).
- **Date-fns / Day.js:** For date/time manipulation and formatting.

**3. Architecture**

**3.1 Application Structure (Recommended)**

```
src/
├── assets/                # Static assets (images, icons, fonts)
├── components/            # Reusable UI components
│   ├── common/            # Generic components (Button, Input, Modal, Card)
│   ├── layout/            # Layout components (Header, Sidebar, Footer, PageContainer)
│   ├── products/          # Components related to product display and interaction
│   ├── alerts/            # Components specific to maritime alerts
│   └── map/               # Reusable map display components (if needed for AMS/FTS)
├── features/              # Feature-specific components, hooks, and logic slices
│   ├── auth/              # Authentication, registration, profile
│   ├── marketplace/       # Product listings, product details
│   ├── cart/              # Shopping cart
│   ├── checkout/          # Checkout process, payment form
│   ├── dashboard/         # User dashboard, purchased products, settings
│   ├── productConfig/     # UI for configuring products like VTS, AMS
│   ├── reports/           # UI for accessing/displaying reports
│   └── investigations/    # UI for RFI forms
├── hooks/                 # Custom React hooks (e.g., useAuth, useDebounce)
├── pages/                 # Top-level route components
├── services/              # RTK Query API definitions (alternatively in store/api/)
├── store/                 # Redux store configuration
│   ├── slices/            # Redux feature slices (authSlice, cartSlice, uiSlice)
│   └── index.ts           # Root store configuration
├── types/                 # Global TypeScript type definitions (entities, API responses)
├── utils/                 # Utility functions (formatters, validators)
├── App.tsx                # Main application component (routing setup)
├── main.tsx               # Application entry point
└── index.html             # HTML template
```

**3.2 High-Level Component Hierarchy**

```
App
└── RouterProvider
    ├── AuthLayout (Handles public routes like Login, Register)
    │   ├── LoginPage
    │   └── RegisterPage
    └── MainLayout (Header, Sidebar - for authenticated users)
        ├── ProtectedRoute (Wrapper for routes requiring authentication)
        │   ├── MarketplacePage (Product Listing)
        │   ├── ProductDetailsPage
        │   ├── ProductConfigurationPage (e.g., for Maritime Alert)
        │   ├── CartPage
        │   ├── CheckoutPage
        │   ├── PaymentConfirmationPage
        │   ├── DashboardPage (My Products, Alerts Overview)
        │   ├── ReportsPage (Vessel Compliance, Chronology)
        │   ├── AMSGuiPage
        │   ├── FTSGuiPage
        │   ├── RFIFormPage (Maritime Investigations)
        │   └── UserSettingsPage (Profile, Billing stubs)
    ├── NotFoundPage
```

**4. Key Features & Frontend Implementation Details**

(References to Figma images: `001.jpeg` - Marketplace, `002.jpeg` - Product Details, `003.jpeg` - My Products, `004.jpeg` - Login, `005.jpeg` - Payment, `006.jpeg` - Confirmation, `007.jpeg` - Maritime Alert Config, `008.jpeg` - Cart)

**4.1. User Authentication** (Ref: Figma `004.jpeg`, `003.jpeg`)

- **Login & Registration:** Forms with validation (React Hook Form + Zod). JWT-based authentication (mocked token handling), storing auth state in Redux.
- **Protected Routes:** Redirect unauthenticated users.
- **User Profile/Account Area:** Placeholder for basic settings, link to billing/plan (display credits).

**4.2. Marketplace & Product Discovery** (Ref: Figma `001.jpeg`)

- **Product Listing Page:** Display products (grid/list) with image, name, short description, price/credit cost. "Learn more" button to Product Details.
- **Promotional Slider:** Component for promotional content (mocked).
- **Filtering/Search:** Basic client-side filtering/search if feasible with mocked data, otherwise placeholder for future backend search.
- **Data:** Product catalog fetched via RTK Query. Lazy loading for images.

**4.3. Product Details Page** (Ref: Figma `002.jpeg`)

- **Display:** Product image, name, full description, price/credit cost, features.
- **Actions:** "Add to Cart", "Purchase Now" (may lead to configuration or direct checkout).

**4.4. Product Configuration** (Ref: Figma `007.jpeg`, PRD for VTS, AMS, etc.)

- **Interface:** Dedicated UI for products requiring user input before purchase (e.g., VTS criteria, AMS AOI definition, Report parameters).
- **Workflow:** User configures product -> configured item added to cart.
- **Examples:**
  - **Maritime Alert (VTS/AMS/Combined):** Select alert type (Ship, Area, Ship & Area), define parameters.
  - **Vessel Chronology Report:** Select timeframe, depth of report.

**4.5. Shopping Cart** (Ref: Figma `008.jpeg`)

- **Functionality:** Add/remove items, adjust quantity (if applicable).
- **Display:** List of cart items with details, subtotal, tax (mocked), total (in currency and/or credits).
- **Persistence:** Cart state persisted in Redux and potentially local storage.
- **Action:** "Checkout" button.

**4.6. Checkout Process** (Ref: Figma `005.jpeg`, `006.jpeg`)

- **Multi-Step (if complex):** Or single page for payment details.
- **Payment Form:** Mocked fields for credit card / billing info. No real payment processing.
- **Payment Options:** UI to select between direct payment or using credits (if balance sufficient).
- **Order Summary:** Display before final "Pay Now".
- **Purchase Confirmation Page:** Success message, order summary (mocked), links to "Back to Marketplace" or "Launch Product". Cart cleared.

**4.7. User Dashboard / My Products** (Ref: Figma `003.jpeg`)

- **Layout:** Sidebar (My Products, My Team (stub), Billing & Plan (stub), Settings (stub)). Main content area.
- **My Products:** List of purchased/active products/services. "Launch" button leading to:
  - Specific GUIs (AMS, FTS).
  - Alert display pages (VTS).
  - Report download/view links.
- **Credits Balance:** Display user's available credits.
- **Alerts Feed/Notifications:** Section to display triggered alerts relevant to the user's services (VTS, AMS, FTS).

**4.8. Product-Specific GUIs** (Ref: PRD for AMS, FTS)

- **AMS GUI:** Basic map view (e.g., using Leaflet with a tile provider, or static image) for AOI, simulated AIS data, and alert visualization.
- **FTS GUI:** Similar map-based view for fleet visualization, event display.
- **Data:** All map data and vessel positions will be mocked.

**4.9. Reports Delivery** (Ref: PRD for Vessel Compliance & Chronology Reports)

- **Access:** Through "My Products" or a dedicated "My Reports" section.
- **Download:** "Download Report" button simulating file download (mocked PDF/data).

**4.10. Maritime Investigations Service (MIS) Request** (Ref: PRD for MIS)

- **RFI Form:** Page with a form (React Hook Form + Zod) for users to submit details.
- **Action:** "Submit RFI" button simulating request submission. Confirmation message.

**5. UI Components (Examples)**

**5.1 Common Components**

- `Button`: Variants (primary, secondary, outline), loading states, icons.
- `Input`, `Select`, `Checkbox`, `Radio`: With validation states, labels.
- `Card`: For products, alerts, dashboard summaries.
- `Modal`: For confirmations, detailed views, forms.
- `Notification/Toast`: For non-blocking messages (success, error, info).
- `Table`: For displaying lists of data (alerts, transactions) with basic sorting/pagination (client-side for mocks).
- `Spinner/Loader`: For indicating loading states.

**5.2 Feature-Specific Components**

- `ProductGridItem`: Individual product card in the marketplace.
- `AlertConfigurator`: Component for building/editing alert criteria.
- `CheckoutForm`: The payment and billing information form.
- `CreditBalanceDisplay`: Shows user's credits.
- `DashboardWidget`: Reusable card for dashboard sections.
- `MapView`: Basic map display for AMS/FTS (mocked interactions).

**5.3 Responsive Design**

- Mobile-first approach using Tailwind CSS breakpoints (e.g., sm, md, lg, xl).
- Ensure usability on small screens (minimum 320px width) up to desktop.

**6. State Management**

**6.1. Redux Toolkit**

- **Global State:**
  - `authSlice`: User object, authentication tokens (mocked), auth status.
  - `cartSlice`: Cart items, total amount, total credits.
  - `uiSlice`: Global UI state like active theme (if any), main sidebar visibility, notifications.
  - `creditsSlice`: User's credit balance, transaction history (mocked).
- **Local Component State (useState, useReducer):** For form data, UI element state (e.g., dropdown open/close) not needed globally.

**6.2. RTK Query**

- **API Slices:** Define API interactions for:
  - Authentication (login, register, fetch profile).
  - Products (fetch list, fetch details).
  - User-specific data (purchased products, alerts, credit transactions).
  - Cart operations (if interacting with a persisted cart backend in the future, for now can be client-only or mock backend).
  - Order submission (mocked).
- **Benefits:** Handles caching, loading/error states, optimistic updates (if needed).

**6.3. Local Storage / Session Storage**

- Persist JWT tokens (e.g., in `localStorage` or `sessionStorage` for mocked scenario).
- Persist cart contents (`localStorage`) to survive page reloads.
- User UI preferences (e.g., theme, `localStorage`).

**7. API Integration & Mocking**

**7.2. API Endpoint Structure (Examples to be mocked by MSW)**

```javascript
// Base URL: /api (configurable)
const API_ENDPOINTS = {
  auth: {
    login: '/auth/login', // POST
    register: '/auth/register', // POST
    profile: '/auth/me', // GET (after login)
  },
  products: {
    list: '/products', // GET
    details: '/products/:id', // GET
    // search: '/products/search', // GET (with query params)
  },
  cart: {
    // Assuming cart is managed client-side or via simple mock backend
    get: '/cart', // GET
    addItem: '/cart/items', // POST
    updateItem: '/cart/items/:itemId', // PUT
    removeItem: '/cart/items/:itemId', // DELETE
  },
  orders: {
    // For checkout simulation
    create: '/orders', // POST
    details: '/orders/:orderId', // GET
  },
  credits: {
    balance: '/user/credits', // GET
    // purchase: '/credits/purchase', // POST (if buying credits is a feature)
    // transactions: '/user/credits/transactions', // GET
  },
  alerts: {
    // For user's configured/triggered alerts
    list: '/user/alerts', // GET
    create: '/alerts', // POST (for configuring new VTS/AMS alerts)
    details: '/alerts/:alertId', // GET
    // update: '/alerts/:alertId', // PUT
    // delete: '/alerts/:alertId', // DELETE
  },
  rfi: {
    // For Maritime Investigations
    submit: '/investigations/rfi', // POST
  },
};
```

**7.3. Integration Strategy**

- RTK Query services will define endpoints and expected request/response shapes.
- MSW handlers will implement these shapes with mock data.
- Use environment variables (e.g., `VITE_API_BASE_URL`) if needed, though for MSW it intercepts at the network level.

**8. Authentication (Frontend Focus)**

**8.1. Authentication Flow**

1.  User submits login/registration form.
2.  RTK Query mutation sends credentials to MSW handler for `/api/auth/login` or `/api/auth/register`.
3.  MSW returns a mock JWT token and user profile.
4.  Token stored in Redux state and `localStorage`/`sessionStorage`.
5.  User profile stored in Redux state.
6.  Subsequent RTK Query requests automatically include the token in headers (via `prepareHeaders` in RTK Query API definition).
7.  Logout clears token from state and storage, redirects to login.

**8.2. Authorization**

- **Protected Routes:** Wrap routes with a component that checks auth state in Redux. Redirect if not authenticated.
- **Conditional UI:** Show/hide UI elements based on auth status or (mocked) user roles/permissions if applicable.

**9. Development Approach**

**9.1. Mock Server Implementation (`src/mocks/`)**

- **Structure:** Handlers grouped by feature (auth, products, etc.). Central mock data files.
- **Realism:** Mimic actual API response structures, including pagination, filtering parameters (even if client-side for now), and error codes.
- **Switchable:** MSW is typically enabled for development and can be excluded from production builds.

**10. Recommended Order of Development (Roadmap)**

This roadmap outlines a logical sequence for tackling development, focusing on building foundational elements first.

**Phase 1: Foundation & Core Architecture**

1.  **Project Setup:** Vite, React, TypeScript, Tailwind CSS. Basic folder structure.
2.  **Core Layout:** Main App component, basic routing setup (React Router), Header, Footer, Sidebar stubs.
3.  **Redux & RTK Query Setup:** Configure Redux store, set up initial RTK Query API slice (e.g., for a simple health check or user profile).
4.  **UI Component Library (Common):** Develop essential common components (Button, Input, Card, Modal).

**Phase 2: Authentication & User Management**

1.  **Auth State:** Redux slice for authentication.
2.  **Auth API:** RTK Query endpoints and MSW handlers for login, registration, fetching user profile.
3.  **Pages & Forms:** Login page, Registration page with forms (React Hook Form + Zod).
4.  **Protected Routes:** Implement logic to protect authenticated routes.
5.  **User Profile Stub:** Basic page to display user info once logged in.

**Phase 3: Marketplace & Product Display**

1.  **Product State & API:** Redux (if needed for client-side filtering states) and RTK Query for fetching product list and details. MSW handlers for product data.
2.  **Pages:** Marketplace (product listing) page, Product Details page.
3.  **Components:** `ProductCard`, product image gallery, promotional slider (basic).
4.  **Navigation:** Routing between marketplace and product details.

**Phase 4: Shopping Cart Functionality**

1.  **Cart State:** Redux slice for managing cart items.
2.  **Cart UI:** Cart page displaying items, totals. Components for cart items.
3.  **Functionality:** Add to cart (from product page/listing), remove from cart, update quantity (if applicable). Cart persistence using `localStorage`.

**Phase 5: Product Configuration & Checkout**

1.  **Product Configuration UI:**
    - Design and implement UI for configurable products (e.g., Maritime Alert: `007.jpeg`).
    - Logic to capture configuration and add specialized item to cart.
2.  **Checkout API (Mocked):** MSW handlers for simulating order creation/payment.
3.  **Checkout Page:** Form for payment (mocked fields), billing address. Order summary.
4.  **Payment Logic:** UI for selecting credit vs. direct payment. Update totals accordingly.
5.  **Purchase Confirmation Page:** Display success message, (mocked) order details.

**Phase 6: User Dashboard & Purchased Products**

1.  **Dashboard Layout:** Implement the main dashboard structure (sidebar navigation from `003.jpeg`).
2.  **"My Products" API & UI:** RTK Query endpoint to fetch user's purchased products (mocked based on "orders"). Display list of purchased items with "Launch" buttons.
3.  **Credits System UI:** Display credit balance (fetched or mocked).
4.  **Alerts Display:** Basic UI within the dashboard to list alerts (fetched via RTK Query, mocked).

**Phase 7: Specialized GUIs & Advanced Features**

1.  **AMS/FTS GUIs:** Develop basic map-based interfaces (mocked data and interactions).
2.  **Reports Delivery:** UI in dashboard to access/download Vessel Compliance and Chronology reports.
3.  **MIS RFI Form:** Implement the Request for Intelligence form.
4.  **Refinements:** Polish UI/UX, ensure responsive design across key views, review form validations.

**11. Appendices**

**Appendix A: Product Data Models (Frontend Perspective - Examples)**

```typescript
interface BaseProduct {
  id: string;
  name: string;
  shortDescription: string;
  longDescription: string;
  type:
    | 'VTS'
    | 'AMS'
    | 'FTS'
    | 'REPORT_COMPLIANCE'
    | 'REPORT_CHRONOLOGY'
    | 'INVESTIGATION'
    | 'MARITIME_ALERT'; // More specific types
  price: number; // Currency amount
  creditCost: number;
  imageUrl?: string;
  tags?: string[];
  // Common configuration options might go here if widely applicable
}

interface MaritimeAlertProduct extends BaseProduct {
  type: 'MARITIME_ALERT';
  // Specific configuration options for Maritime Alert
  alertTypesAvailable: Array<'SHIP' | 'AREA' | 'SHIP_AND_AREA'>;
  // Further criteria options can be nested or fetched separately
}

interface VesselTrackingServiceConfig {
  // Example for a configured VTS item in cart or owned products
  productId: string; // Links to BaseProduct of type VTS
  trackingDurationDays: number;
  selectedCriteria: string[]; // e.g., ['AIS_REPORTING_6HR', 'DARK_EVENT']
  vesselIMOs: string[];
}

interface AreaMonitoringServiceConfig {
  productId: string; // Links to BaseProduct of type AMS
  monitoringDurationDays: number;
  aoiDefinition: any; // GeoJSON or similar
  selectedCriteria: string[];
  updateFrequencyHours: 6 | 12 | 24;
}

// Similar specific interfaces for FTS, ReportProduct (Compliance, Chronology), InvestigationProduct
// These would define what data is needed to display and configure them.

interface CartItem {
  itemId: string; // Unique ID for the cart item instance
  product: BaseProduct;
  quantity: number;
  configuredPrice?: number; // If configuration affects price
  configuredCreditCost?: number;
  configurationDetails?: any; // To store VTSConfig, AMSConfig etc.
}

interface UserProfile {
  id: string;
  email: string;
  name?: string;
  credits: number;
  // other relevant user data
}

interface AlertNotification {
  id: string;
  timestamp: string; // ISO date string
  title: string;
  summary: string;
  read: boolean;
  linkToDetails?: string; // e.g., /dashboard/ams/xyz?eventId=123
  severity?: 'info' | 'warning' | 'critical';
}
```

**Appendix B: Open Questions (from PRD1, refined)**

- **"Purchase Now" vs. "Add to Cart":** Clarify the exact UX flow. Does "Purchase Now" bypass the cart for single-item quick buys, or always go through cart/checkout? Is it only for non-configurable products?
- **Product Configuration Details:** For VTS, AMS, FTS, and Reports, what are ALL the specific criteria, their input types (dropdown, text, map selection for AOI), and interdependencies the user needs to configure? (Crucial for building the config UIs).
- **Credits System - Purchase Flow:** While displaying credit balance is clear, how are credits _purchased_ by the user? Is this flow part of this frontend project? (Assuming not for initial MVP if not in Figma).
- **Tax Calculation:** Confirm if any specific display logic for tax is needed, even if the calculation is mocked. (e.g., display as a line item, configurable tax rate for mocking).
- **"Launch Product Now" Destinations:**
  - For VTS: Does it go to a page showing active tracking and alerts for a specific VTS purchase?
  - For AMS/FTS: Specific dashboard/GUI.
  - For Reports: Direct download or a viewer page?
- **Dashboard Sections - "My Team", "Billing & Plan", "Settings":** What minimal placeholder content or functionality (if any) is expected for these sections in the initial frontend build?
- **Alert Granularity in Dashboard:** How should alerts be displayed and potentially filtered in the main dashboard alerts feed?
- **Error Message Specificity:** Are there specific error messages or error handling flows required for certain actions (e.g., insufficient credits, invalid configuration)?
