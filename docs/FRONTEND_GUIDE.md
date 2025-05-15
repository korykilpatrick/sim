Okay, here's the revised `FRONTEND_GUIDE.md` with references to MSW, Accessibility (A11y), and Internationalization (i18n) removed, as requested.

-----

# FRONTEND\_GUIDE.md

**Preamble:** This guide outlines the standards and practices for frontend development. Every instruction is designed for clarity, enabling an AI to parse, understand, and implement efficiently, leading to a world-class codebase. Adherence to this guide is paramount.

**Core Tech Stack:** React 18, Vite, TypeScript, Tailwind CSS, Redux Toolkit (RTK), React Router, Testing Library, Jest/Vitest.

-----

## 1\. Guiding Principles

1.1. **Target:** Single-Page Applications (SPAs) for evergreen browsers.
1.2. **Baseline:** React 18 + Vite + strict TypeScript.
1.3. **Development Philosophy:**
\* Ship fast, fail loudly, recover gracefully.
\* "Pit of success" Developer Experience (DX): Scripts, tools, and patterns are configured to make a correct implementation the easiest path.
\* Optimize for readability and maintainability first, then performance.
1.4. **Code & Architecture:**
\* Co-locate files that change together (e.g., component, styles, tests).
\* No implicit global state. State management must be explicit.
\* Prefer composition over inheritance. Higher-Order Components (HOCs) are preferred over mixins if advanced composition is needed, but hooks are the first choice for reusable logic.
\* Strive for functional purity in utility functions and business logic where possible.
\* Data flow MUST be unidirectional and immutable. Mutations must be explicit and managed (e.g., via Redux Toolkit reducers).
\* Server communication MUST use typed wrappers around `Workspace` or RTK Query to interact with the Express backend.
1.5. **Quality & Performance:**
\* Dark mode MUST be supported out-of-the-box using CSS custom properties and Tailwind's `dark:` variant.
\* **Target high Lighthouse Scores** across Performance, Best Practices, and SEO. This includes a functional `manifest.json` and a basic service worker for PWA offline capability.
\* Zero console errors or warnings in production builds. All console warnings in development MUST be treated as errors and resolved.
\* Build, lint, and test processes SHOULD complete in under 120 seconds on a standard development machine.
\* **Performance Budgets:**
\* Initial JavaScript load (gzipped): ≤ 170KB.
\* First Contentful Paint (FCP): ≤ 1.8 seconds.
\* Largest Contentful Paint (LCP): ≤ 2.5 seconds.
\* Cumulative Layout Shift (CLS): ≤ 0.1.
1.6. **Dependencies:**
\* Aim to keep production runtime dependencies \< 35 and development dependencies \< 45.
\* Before adding a dependency, evaluate its maintenance status, bundle size impact (use `bundlephobia.com`), security vulnerabilities, and whether existing dependencies or native browser APIs can fulfill the need. Prefer smaller, focused libraries.

-----

## 2\. Directory Structure (`/src`)

A clear and scalable directory structure is crucial for maintainability. The `/src` directory MUST be organized as follows, promoting modularity and clear separation of concerns.

```
src/
│  app.tsx                 # Root React component tree, global context providers, router setup
│  main.tsx                # Vite entry point, renders App.tsx
│  vite-env.d.ts           # Vite environment type definitions
│  env.d.ts                # Custom environment variable type definitions (typed by the AI)
│
├─ app/                    # Core application setup (global concerns)
│  │  store.ts             # Redux store configuration
│  │  router.tsx           # Application routes configuration (lazy loaded)
│  │  api.ts               # (Optional, for smaller apps) Global RTK Query API slice OR aggregation of feature API slices
│  │  GlobalStyles.tsx     # Component for global styles (fonts, base resets beyond Tailwind)
│  └─ types.ts             # Core application-wide TypeScript types (e.g., global error types)
│
├─ pages/                  # Route components (top-level views for each URL)
│   ├─ ProductDetailsPage/ # Example: A page displaying details for a specific product
│   │   │  ProductDetailsPage.tsx # Page component: orchestrates features & components, fetches page-level data
│   │   │  ProductDetailsPage.module.css # (Optional) CSS Modules for page-specific, complex styles
│   │   │  ProductDetailsPage.test.tsx   # Tests for the page component
│   │   └─ index.ts        # Barrel file: export * from './ProductDetailsPage';
│   └─ ...                 # Other pages, following the same structure (e.g., HomePage, SettingsPage)
│
├─ features/               # Self-contained feature modules (e.g., authentication, product management, user cart)
│   ├─ products/           # Example: "Products" feature module
│   │   │  productSlice.ts  # Redux slice for product-related state (e.g., list, filters)
│   │   │  productApi.ts    # RTK Query API slice for fetching/managing product data
│   │   │  components/      # Components specific to and used only within the Products feature
│   │   │  │ ├─ ProductCard/ # A component to display a product summary
│   │   │  │ │  │  ProductCard.tsx
│   │   │  │ │  │  ProductCard.test.tsx
│   │   │  │ │  └─ index.ts
│   │   │  │ └─ ProductFilterControls.tsx # UI for filtering products
│   │   │  hooks/           # Hooks specific to product logic (e.g., useProductFilters)
│   │   │  selectors.ts     # Memoized selectors for accessing product state
│   │   │  types.ts         # TypeScript types specific to the Products feature (e.g., Product, ProductFilter)
│   │   │  productUtils.ts  # Utility functions specific to product logic
│   │   └─ index.ts         # Barrel file: exports public interface of the Products feature (hooks, components, types)
│   └─ auth/                # Example: "Authentication" feature module (similar structure)
│   └─ ...                  # Other features
│
├─ components/             # Shared, reusable UI components (presentation-focused, not tied to specific features)
│   ├─ ui/                 # Primitive UI elements (Button, Input, Card, Modal, etc.) - The "Design System"
│   │  ├─ Button/
│   │  │  │  Button.tsx
│   │  │  │  Button.test.tsx
│   │  │  └─ index.ts
│   │  ├─ Card/
│   │  │  │  Card.tsx
│   │  │  │  Card.test.tsx
│   │  │  └─ index.ts
│   │  └─ ...               # Other UI primitives
│   ├─ layout/             # Macro layout components (Header, Footer, Sidebar, PageGrid)
│   │  ├─ Header/
│   │  │  │  Header.tsx
│   │  │  │  Header.test.tsx
│   │  │  └─ index.ts
│   │  └─ ...
│   └─ index.ts            # Barrel file for all shared components
│
├─ hooks/                  # Globally reusable custom React hooks (e.g., useDebounce, useMediaQuery)
│   ├─ useDebounce.ts
│   ├─ useDebounce.test.ts
│   └─ index.ts
│
├─ lib/                    # Pure utility functions, external library configurations/wrappers (non-React specific)
│   ├─ dateUtils.ts
│   ├─ formatters.ts
│   ├─ zodSchemas.ts       # Centralized Zod schemas if not feature-specific or app-core
│   └─ index.ts
│
├─ styles/                 # Global styles, Tailwind configuration, CSS variables
│   ├─ tailwind.css        # Main Tailwind import file (@tailwind base, components, utilities)
│   └─ globals.css         # Additional global styles, font faces, CSS custom properties for theming
│
└─ tests/                  # Global test setup, utilities
    ├─ setupTests.ts       # Jest/Vitest global setup (e.g., RTL config, jest-dom)
    └─ testUtils.tsx       # Custom test utilities/render wrappers
```

**Directory Deep Dive & Philosophy:**

  * **`pages/`**: Each subdirectory represents a distinct view accessible via a URL. Page components are primarily orchestrators. They fetch data required for the entire page (often using hooks from relevant feature modules) and compose components from `features/` and `components/` to build the UI. Example: `ProductDetailsPage.tsx` might use `useGetProductByIdQuery` from `features/products/productApi.ts` and then pass the product data to `features/products/components/ProductDisplay.tsx`.
  * **`features/`**: These are the core business logic domains of your application. Each feature is a self-contained module.
      * **Encapsulation:** A feature should manage its own state (`*Slice.ts`), API interactions (`*Api.ts`), feature-specific components (`components/`), hooks (`hooks/`), types (`types.ts`), and utility functions (`*Utils.ts`).
      * **Public Interface:** A feature exposes only what's needed by other parts of the app (typically pages) through its root `index.ts`.
      * **Example (`features/products/`)**:
          * `productApi.ts` defines RTK Query endpoints for `/api/products`, `/api/products/:id` which connect to the Express backend.
          * `components/ProductCard.tsx` is used within the `products` feature. If it becomes generic, it's moved to `components/ui/`.
  * **`components/`**: This directory is for truly reusable UI elements.
      * **`ui/`**: Contains atomic, presentational components (Button, Input, Card, etc.).
      * **`layout/`**: Contains components that define the structural layout of pages.
  * **Type Co-location:** Types specific to a feature belong in that feature's `types.ts`. Globally shared types live in `components/`, `hooks/`, or `app/types.ts`. See Section 8 for more on Type Handling.

**Directory Rules:**

2.1. **No Cross-Imports Between `pages/` Subdirectories:** Pages communicate via Redux store, hooks, or route parameters.
2.2. **Restricted Cross-Imports Between `features/` Subdirectories:** Features SHOULD primarily communicate via the Redux store or globally shared hooks. A feature MUST NOT directly import from another feature's internal files. It MUST only import what is exposed via the other feature's root `index.ts`.
2.3. **`lib/**` MUST be side-effect free and use the strictest TypeScript settings.**
2.4. **Barrel `index.ts` files MUST be used at the root of each significant folder** to re-export public modules.
2.5. Tests (`*.test.ts(x)`) MUST be collocated with the component or module they are testing/documenting, except for global test setup in `src/tests/`.

-----

## 3\. File & Naming Conventions

| Purpose                      | Pattern                                   | Example                        | Notes                                      |
| ---------------------------- | ----------------------------------------- | ------------------------------ | ------------------------------------------ |
| React Component (FC)         | `PascalCase.tsx`                          | `UserProfile.tsx`              |                                            |
| React Hook                   | `useCamelCase.ts`                         | `useAuth.ts`                   |                                            |
| Redux Slice                  | `nounSlice.ts`                            | `cartSlice.ts`                 |                                            |
| Redux Selectors (file)       | `(featureName.)selectors.ts`              | `cart.selectors.ts`            | Collocated with slice or feature           |
| RTK Query API Slice          | `(featureName)Api.ts`                     | `productsApi.ts`               | Collocated with feature                    |
| Utility/Service Function     | `verbNoun.ts` / `nounUtils.ts`            | `formatDate.ts`, `arrayUtils.ts` |                                            |
| Type Definitions (file)      | `*.types.ts` or `types.ts`                | `invoice.types.ts`, `products/types.ts` | Collocated within module or feature        |
| Test File                    | `*.test.ts` or `*.test.tsx`               | `Button.test.tsx`              | Collocated                                 |
| CSS Modules File             | `*.module.css`                            | `UserProfile.module.css`       | Collocated, for styles not suited to Tailwind |
| **Folders** | `kebab-case`                              | `user-profile`, `shared-hooks` |                                            |
| **Variables/Functions** | `camelCase`                               | `const itemCount = 0;`         |                                            |
| **Constants** | `UPPER_SNAKE_CASE`                        | `const MAX_USERS = 100;`       | For true global or module constants        |
| **React Props** | `camelCase`                               | `isLoading={true}`             | Example: `userName: string`              |
| **Component as Prop** | `PascalCase`                              | `IconComponent={UserIcon}`     |                                            |
| **Type/Interface Names** | `PascalCase`                              | `interface UserProfile { ... }`| Example: `type ProductId = string;`      |
| **Union Type Literals** | `PascalCase` for type name, string literals as appropriate | `type Status = 'Pending' \| 'Completed';` | See TypeScript rules |

**CSS Modules Usage:** Only use CSS Modules for component-specific styles that are difficult to express with Tailwind utility classes or require complex selectors/animations not easily managed by Tailwind. Prefer Tailwind for all other styling.

-----

## 4\. Styling (Tailwind CSS & Global Styles)

4.1. **Tailwind CSS First:** Tailwind CSS is the primary styling method.
\* Content MUST be configured for all relevant source files (`src/**/*.{js,jsx,ts,tsx}`).
\* Custom theme tokens MUST be defined in `tailwind.config.js`.
\* **NEVER use arbitrary values directly in class names.**
4.2. **Styling Application:**
\* `components/ui/**` and `components/layout/**` encapsulate styles.
\* Feature/Page components SHOULD primarily compose UI elements and MAY use Tailwind for structural layout.
4.3. **`cn()` Utility:** A utility function `cn` (combining `clsx` and `tailwind-merge`) MUST be used for conditional classes.
` typescript // src/lib/cn.ts import { clsx, type ClassValue } from 'clsx'; import { twMerge } from 'tailwind-merge'; export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));  `
4.4. **Global Styles:** Global styles reside in `src/styles/globals.css`.
4.5. **No Global Semantic CSS Classes:** Avoid creating global utility-like CSS classes. This is the role of React components in `components/ui/`.

-----

## 5\. State Management (Redux Toolkit & RTK Query)

5.1. **Redux Toolkit (RTK) is the standard for global state management.**
5.2. **Store Configuration (`src/app/store.ts`):** Standard setup, combining feature slices and API reducers.
` typescript import { configureStore } from '@reduxjs/toolkit'; export const store = configureStore({ reducer: { /* feature slices and API reducers */ }, middleware: (getDefaultMiddleware) => getDefaultMiddleware() /* .concat(api.middleware) */, }); export type RootState = ReturnType<typeof store.getState>; export type AppDispatch = typeof store.dispatch;  `
5.3. **Slices (`features/**/featureSlice.ts`):** Use `createSlice` and typed `PayloadAction`. Use `createEntityAdapter` for normalization.
5.4. **RTK Query (`features/**/featureApi.ts`):** PREFERRED for data fetching against the Express backend. Define API slices per feature. Use tags for cache management.
5.5. **Selectors:** Use `reselect` or RTK's `createSelector`.
5.6. **React-Redux Hooks:** Use typed `useAppDispatch` and `useAppSelector`.
5.7. **Local vs. Global State:** Use Redux for global/server state; React local state for UI-specific state.

-----

## 6\. Components & React Architecture

6.1. **Pattern: Pages \> Features \> Components (Atomic Design Influence)**
\* **Pages (`src/pages/**`):** Orchestrators for views.
\* **Features (`src/features/**`):** Encapsulated business logic modules.
\* **Shared Components (`src/components/**`):**
\* **UI (`src/components/ui/**`):** Presentational, reusable primitives.
\* **Layout (`src/components/layout/**`):** Structural components.
6.2. **Atomic Component Design:**
\* **Importance:** Components MUST be broken down into their smallest logical, reusable parts.
\* **Example: `UserProfileCard`** (as previously detailed, composing smaller `Avatar`, `UserInfoLine`, `Button` components). This approach enhances reusability, testability, and maintainability.
6.3. **Props:** MUST be typed. Type definitions SHOULD be collocated or in feature/shared `types.ts`.
6.4. **Side Effects:** MUST be handled within React hooks or RTK Query.
6.5. **Memoization:** Use `React.memo`, `useMemo`, `useCallback` judiciously.

-----

## 7\. Hooks (`src/hooks/**`)

7.1. Custom hooks extract reusable component logic. Generic hooks in `src/hooks/`, feature-specific in `src/features/[featureName]/hooks/`.
7.2. **Common Hooks Cookbook (Examples):** `useDebounce`, `useThrottle`, `useMediaQuery`, `useZodForm`, `useIntersectionObserver`, `useDarkMode`, `useEventListener`, `useLocalStorage`.
7.3. All custom hooks MUST be unit-tested. Types for arguments and return values MUST be clearly defined.

-----

## 8\. TypeScript Configuration & Rules

8.1. **`tsconfig.json` Base Configuration:** Strict settings, path aliases.
` json { "compilerOptions": { "target": "ESNext", "lib": ["DOM", "DOM.Iterable", "ESNext"], "module": "ESNext", "skipLibCheck": true, "moduleResolution": "bundler", "resolveJsonModule": true, "isolatedModules": true, "noEmit": true, "jsx": "react-jsx", "strict": true, "noUnusedLocals": true, "noUnusedParameters": true, "noFallthroughCasesInSwitch": true, "noImplicitReturns": true, "forceConsistentCasingInFileNames": true, "exactOptionalPropertyTypes": true, "noUncheckedIndexedAccess": true, "allowUnusedLabels": false, "allowUnreachableCode": false, "baseUrl": ".", "paths": { "@/*": ["src/*"] } }, "include": ["src", "vite.config.ts", "vitest.config.ts", "tailwind.config.js"], "references": [{ "path": "./tsconfig.node.json" }] }  `
8.2. **Forbidden Types & Practices:** `any`, `Function`, `{}` (empty object type), non-null assertions (`!`) are BANNED. Bare `enum`s are DISALLOWED; use union of string literals or `as const` objects.
8.3. **Type Utilities:** Use `ts-reset` and `type-fest`.
8.4. **DTOs and Mappers:** Types and mapping functions for data transfer objects SHOULD be in feature-specific type files or `lib/mappers.ts`. Mappers MUST be pure.
8.5. **Readonly:** Prefer `readonly` for immutability.
8.6. **Type Organization and Scope (Emphasis):**
\* **Co-location is Key:** Define types close to their usage.
\* **Component Props/State:** In the `.tsx` file or a local `types.ts`.
\* **Feature-Specific Types:** In `src/features/[featureName]/types.ts`.
\* **Global Reusable Types:** In `src/hooks/types.ts`, `src/lib/types.ts`, or `src/app/types.ts`.
\* **API Types (RTK Query):** Alongside endpoint definitions or imported from feature `types.ts`.
\* **Exports & Imports:** Use named exports for types. Import types explicitly using `import type { ... } from '...'`.
\* **Clarity and Specificity:** Be specific. Good typing is crucial.
\* **Derived Types:** Use TypeScript utility types.
\* **Zod for Validation & Types:** Use Zod schemas for external data and infer types from them.

-----

## 9\. Linting & Formatting (ESLint, Prettier)

9.1. **ESLint (`.eslintrc.cjs`):** Type-aware linting.
\* Core `extends`:
` javascript // .eslintrc.cjs example module.exports = { root: true, env: { browser: true, es2020: true, node: true }, extends: [ 'eslint:recommended', 'plugin:@typescript-eslint/strict-type-checked', 'plugin:@typescript-eslint/stylistic-type-checked', 'plugin:react/recommended', 'plugin:react/jsx-runtime', 'plugin:react-hooks/recommended', 'plugin:import/recommended', 'plugin:import/typescript', 'plugin:prettier/recommended', // MUST be last ], parser: '@typescript-eslint/parser', parserOptions: { /* ... project: ['./tsconfig.json', './tsconfig.node.json'], tsconfigRootDir: __dirname */ }, settings: { /* ... react: { version: 'detect' }, 'import/resolver': { typescript: { ... } } */ }, rules: { 'no-console': ['warn', { allow: ['warn', 'error'] }], 'no-restricted-imports': ['error', { patterns: [{ group: ['../**/'], message: "Usage of relative parent imports is discouraged. Use path aliases '@/' instead."}] }], '@typescript-eslint/no-explicit-any': 'error', '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }], '@typescript-eslint/consistent-type-imports': ['error', { prefer: 'type-imports', fixStyle: 'inline-type-imports' }], 'react/prop-types': 'off', 'react/self-closing-comp': 'warn', 'import/order': [ 'error', { /* ... groups, pathGroups, newlines-between, alphabetize ... */ } ], 'import/no-default-export': 'error', 'react-hooks/exhaustive-deps': 'error', }, };  `
9.2. **Prettier (`.prettierrc.json`):** Standard configuration (80 char width, single quotes, etc.).
` json { "printWidth": 80, "tabWidth": 2, "useTabs": false, "semi": true, "singleQuote": true, "trailingComma": "all", "bracketSpacing": true, "jsxSingleQuote": false, "arrowParens": "always", "endOfLine": "lf" }  `
9.3. **No Default Exports:** Prefer named exports. Exceptions for lazy-loaded page components.

-----

## 10\. Testing Strategy

10.1. **Framework:** Use Vitest (preferred with Vite) or Jest.
10.2. **Libraries:** React Testing Library (RTL), `@testing-library/jest-dom`.
10.3. **Test Collocation:** Tests (`*.test.tsx` or `*.test.ts`) MUST be collocated.
10.4. **Coverage:** Aim for high test coverage (\>80%) for critical paths, logic, slices, hooks, and UI components.
10.5. **Focus:** Test user-observable behavior, not implementation details.
10.6. **API Interactions in Tests:**
\* Since there's a dedicated Express backend, tests involving API calls SHOULD ideally run against a test instance of this backend populated with deterministic test data.
\* If direct backend calls are not feasible for all unit/integration test scenarios (e.g., for speed, isolation, or lack of a stable test backend environment for all cases), then request mocking for specific test files MAY be employed using libraries like `vitest.spyOn` or `jest.spyOn` to mock `Workspace` or specific service modules responsible for API calls. The goal is to ensure components behave correctly based on expected API responses without relying on client-side full API mocking like MSW.
10.7. **Test Utilities:** Common test setup (e.g., custom render function with providers) in `src/tests/testUtils.tsx`.
10.8. **`setupTests.ts` (`src/tests/setupTests.ts`):** Import `@testing-library/jest-dom`. Any other global test environment setup.

-----

## 11\. Data Fetching & Mutations

11.1. **Primary Tool:** RTK Query is the primary tool for data fetching from the Express backend.
11.2. **Loading States:** Always provide loading indicators.
11.3. **Error States:** Display user-friendly error messages and offer retry mechanisms.
11.4. **Optimistic Updates (for mutations):** Implement for a better UX.
11.5. **Immutability:** All cache updates MUST be immutable.
11.6. **Retries:** Utilize RTK Query's built-in retry options.

-----

## 12\. Error Handling & Logging

12.1. **Error Boundaries:** Implement a global Error Boundary in `app.tsx`. Consider granular Error Boundaries for major features.
12.2. **Logging:** Integrate a remote logging service (e.g., Sentry). Report caught errors. Configure DSN via environment variables.
12.3. **Console Output:** Avoid `console.log()`. `console.warn()`, `console.error()` are permitted for important issues.

-----

## 13\. Build & Performance Optimization

13.1. **Vite Configuration (`vite.config.ts`):** Optimize production builds. Utilize code splitting. Optimize assets.
13.2. **Bundle Analysis:** Regularly analyze the production bundle size.
13.3. **Lazy Loading:** Lazy load offscreen images.
13.4. **Memoization:** Apply `React.memo`, `useMemo`, `useCallback` judiciously.
13.5. **Web Vitals:** Monitor Core Web Vitals in production.

-----

## 14\. Environment & Configuration

14.1. **Environment Variables:**
\* MUST be prefixed with `VITE_`.
\* Define types in `src/env.d.ts`.
\* **NEVER commit sensitive keys.** Use `.env.local` and platform environment variables. Provide `.env.example`.
14.2. **Configuration Files:** Core configurations MUST reside at the project root.

-----

## 15\. Documentation & Comments

15.1. **Readability First:** Code should be as self-documenting as possible.
15.2. **TSDoc:** Use TSDoc comments for all exported functions, types, interfaces, components, and custom hooks.
`` typescript /** * Calculates the total price of items in a cart. * @param items - An array of cart items. Each item must have a `price` and `quantity`. * @param discountPercentage - An optional discount (0-100) to apply. * @returns The total price after applying the discount. * @throws Error if discountPercentage is out of range. */ export const calculateTotalPrice = (/*...params...*/) => { /* ... */ };  ``
15.3. **Complex Logic:** Comment complex or non-obvious internal logic.
15.4. **Architectural Decisions:** Document significant architectural decisions in `ADR` files if necessary.
15.5. **README.md:** MUST contain project description, setup instructions, key scripts, and a link to this guide.

-----

## 16\. Initial Project Setup Checklist (For AI Implementation)

When starting a new project adhering to this guide, the AI MUST perform the following setup steps:

16.1. **Initialize Project:** Use Vite: `npm create vite@latest my-project -- --template react-ts`.
16.2. **Install Core Dependencies:**
\* `react-router-dom @types/react-router-dom`
\* `@reduxjs/toolkit react-redux`
\* `tailwindcss postcss autoprefixer`
\* `clsx tailwind-merge`
\* `@sentry/react @sentry/vite-plugin` (or other error logger)
\* `ts-reset type-fest zod`
16.3. **Install Dev Dependencies:**
\* `eslint eslint-plugin-*` (all specified in Section 9)
\* `prettier eslint-config-prettier eslint-plugin-prettier`
\* `vitest @vitest/ui @vitest/coverage-v8 jsdom @testing-library/react @testing-library/jest-dom @testing-library/user-event`
\* `typescript @types/react @types/react-dom @types/node`
16.4. **Directory Structure:** Create the initial directory structure as outlined in Section 2.
16.5. **Configuration Files:**
\* Generate/Scaffold `tailwind.config.js` and `postcss.config.js`.
\* Generate/Scaffold `.eslintrc.cjs` (or `.json`) with rules from Section 9.
\* Generate/Scaffold `.prettierrc.json` (or `.js`) with rules from Section 9.
\* Update `tsconfig.json` and `tsconfig.node.json` (if present) as per Section 8.
\* Create `vite.config.ts` with path aliases (`@/*`), testing setup (Vitest integration).
\* Create `vitest.config.ts` (if Vitest is used) for test environment setup.
\* Create `src/styles/tailwind.css` and `src/styles/globals.css`.
\* Create initial `src/main.tsx`, `src/app.tsx`, `src/app/store.ts`, `src/app/router.tsx`.
\* Create `src/tests/setupTests.ts`.
\* Create `.env.example`.
16.6. **`package.json` Scripts:** Ensure standard scripts are present and functional: `dev`, `build`, `test`, `lint`, `format`, `preview`.

-----

This guide provides a comprehensive foundation. The AI should refer to it consistently. For any ambiguity not covered, the AI should prioritize the core principles of readability, maintainability, performance, and robust interaction with the backend.