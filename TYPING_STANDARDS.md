# TypeScript Standards and Best Practices

This document outlines our approach to TypeScript in the SIM application, providing guidelines and best practices for maintaining type safety throughout the codebase.

## Table of Contents

1. [Type System Overview](#type-system-overview)
2. [Type Definition Standards](#type-definition-standards)
3. [Type Safety Practices](#type-safety-practices)
4. [Shared Types System](#shared-types-system)
5. [React Component Typing](#react-component-typing)
6. [Redux and API Typing](#redux-and-api-typing)
7. [Advanced TypeScript Features](#advanced-typescript-features)
8. [Type Validation](#type-validation)
9. [Examples and Anti-patterns](#examples-and-anti-patterns)

## Type System Overview

### Guiding Principles

Our TypeScript implementation follows these key principles:

1. **Maximum type safety** - We prioritize compile-time type checking to catch issues early.
2. **Zero `any` usage** - We avoid the `any` type and prefer `unknown` with proper type narrowing.
3. **Consistent patterns** - We follow standardized patterns for type definitions and imports.
4. **Self-documenting code** - Types serve as documentation and are enhanced with JSDoc comments.
5. **Shared type definitions** - We maintain shared types between frontend and backend.

### Project Structure

Our types are organized as follows:

- `/shared/types/` - Types shared between frontend and backend
- `/src/types/` - Frontend-specific types
- `/server/types/` - Backend-specific types
- Local component/slice types - Defined in the files where they're used

## Type Definition Standards

### When to use `interface` vs `type`

- Use **`interface`** for:
  - Object shapes that might be extended
  - Class implementations
  - Public API contracts
  - When you need to merge declarations

```typescript
// Good: Using interface for extensible object shapes
interface User {
  id: string;
  email: string;
  name?: string;
}

// Good: Extending interfaces
interface AdminUser extends User {
  permissions: string[];
}
```

- Use **`type`** for:
  - Union types
  - Intersection types
  - Primitive type aliases
  - Tuple types
  - Types that should not be extended
  - Function types
  - Mapped types
  - Conditional types

```typescript
// Good: Using type for unions
type PaymentMethod = 'credit_card' | 'paypal' | 'wire_transfer';

// Good: Using type for function signatures
type FetchCallback = (data: unknown) => void;
```

### Naming Conventions

- **PascalCase** for type names, interfaces, and classes
- **camelCase** for variables, functions, and properties
- Use descriptive names that indicate purpose

Prefix conventions:

- `I` prefix for interfaces is **not** used (e.g., use `User` not `IUser`)
- `T` prefix for generic type parameters (e.g., `TData`)
- `Props` suffix for React component props (e.g., `ButtonProps`)
- `State` suffix for state types (e.g., `AuthState`)

### Import and Export Patterns

- Use explicit `import type` for type imports to avoid bundling issues
- Export types from a central index file for easier imports
- Use barrel exports for related types

```typescript
// Good: Using explicit type imports
import type { User } from '@shared-types/user';
import type { CartItem } from '@shared-types/cart';
import { useState } from 'react';

// Good: Barrel exports
export type { User } from './user';
export type { ProductType, BaseProduct } from './product';
```

## Type Safety Practices

### Null and Undefined Handling

- Use the non-null assertion operator (`!`) only when you're absolutely certain a value is not null/undefined
- Prefer explicit null checks or the optional chaining operator (`?.`)
- Use nullish coalescing operator (`??`) for default values

```typescript
// Good: Using optional chaining
const userName = user?.name ?? 'Anonymous';

// Bad: Using non-null assertion without certainty
const userEmail = user!.email;

// Good: Using explicit null check
if (user && user.email) {
  sendEmail(user.email);
}
```

### Error Handling Patterns

- Use the `AppError` type for consistent error handling
- Use type guards to narrow error types
- Provide detailed type information for error scenarios

```typescript
// Good: Using typed error handling
try {
  await api.fetchData();
} catch (error: unknown) {
  const appError = toAppError(error);
  logError(appError);
}
```

### Type Narrowing and Type Guards

- Use type guards to narrow types from `unknown` to specific types
- Implement custom type guards for domain-specific types
- Use exhaustive checking for discriminated unions

```typescript
// Good: Using custom type guard
function isUser(value: unknown): value is User {
  return (
    isObject(value) && hasProperty(value, 'id') && hasProperty(value, 'email')
  );
}

// Good: Using exhaustive checking with discriminated unions
function getProductTypeName(productType: ProductType): string {
  switch (productType) {
    case 'VTS':
      return 'Vessel Tracking Service';
    // Other cases...
    default:
      const _exhaustiveCheck: never = productType;
      throw new Error(`Unhandled product type: ${_exhaustiveCheck}`);
  }
}
```

## Shared Types System

### Structure and Organization

Our shared types system enables type safety between frontend and backend code. Types that are used by both server and client code reside in the `/shared/types` directory.

Core shared types include:

- User and authentication types
- Product and order types
- Cart and payment types
- Configuration types

### Extension Patterns

When extending shared types, follow these patterns:

1. **Extension through inheritance**: Create a new interface that extends the shared one
2. **Composition**: Compose types using intersection types
3. **Specialization**: Create more specialized types for specific contexts

```typescript
// Good: Extending a shared type for frontend use
import type { User } from '@shared-types/user';

// Extension through inheritance
interface AuthenticatedUser extends User {
  lastLogin: Date;
}

// Composition
type UserWithPreferences = User & { preferences: UserPreferences };

// Specialization
type UserSummary = Pick<User, 'id' | 'name' | 'email'>;
```

## React Component Typing

### Props Typing

- Define prop types using TypeScript interfaces or type aliases
- Use descriptive names and include JSDoc comments
- Explicitly type optional props with the `?` operator
- Use discriminated unions for components with variants

```typescript
/**
 * Props for the Button component
 */
interface ButtonProps {
  /** Text content of the button */
  children: React.ReactNode;
  /** Visual variant of the button */
  variant?: 'primary' | 'secondary' | 'outline' | 'danger';
  /** Size of the button */
  size?: 'sm' | 'md' | 'lg';
  /** Whether the button should display a loading state */
  isLoading?: boolean;
  /** Called when the button is clicked */
  onClick?: () => void;
}
```

### Event Handler Typing

- Use appropriate React event types
- Define type for event handlers inline or as separate type aliases
- Use function type expressions for complex event handlers

```typescript
// Good: Typing event handlers
interface FormProps {
  onSubmit: (data: FormData) => void;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus?: React.FocusEventHandler<HTMLInputElement>;
}
```

### Component State Typing

- Explicitly type useState hooks
- Use interfaces or type aliases for complex state
- Consider using reducers with discriminated unions for complex state logic

```typescript
// Good: Typing component state
interface FormState {
  values: Record<string, string>;
  errors: Record<string, string>;
  isSubmitting: boolean;
}

function MyForm() {
  const [state, setState] = useState<FormState>({
    values: {},
    errors: {},
    isSubmitting: false,
  });
}
```

## Redux and API Typing

### Store Typing Strategies

- Define explicit interfaces for each slice state
- Use the `RootState` type to access the global state
- Leverage TypeScript's inference for actions and reducers
- Use the `PayloadAction` type for action payloads

```typescript
// Good: Typing a Redux slice
interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{ user: User; token: string }>,
    ) => {
      // Implementation...
    },
  },
});
```

### API Integration Type Patterns

- Define request and response types
- Use generic types for reusable API utilities
- Implement proper error handling types

```typescript
// Good: Typing API requests and responses
interface LoginRequest {
  email: string;
  password: string;
}

interface AuthResponse {
  user: User;
  token: string;
}

// Using with RTK Query
const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<AuthResponse, LoginRequest>({
      // Implementation...
    }),
  }),
});
```

### Async Data Handling

- Use discriminated unions for request states
- Type the loading, success, and error states explicitly
- Use utility types to create consistent patterns

```typescript
// Good: Using ApiState utility type for async data
type ProductsState = ApiState<Product[]>;

// Expanded form:
interface ProductsState {
  data: Product[] | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}
```

## Advanced TypeScript Features

### Utility Types

Our codebase includes common utility types to enhance type safety and reduce repetition:

- `Nullable<T>` - Makes all properties in T nullable
- `Optional<T>` - Makes all properties in T optional
- `WithId<T>` - Adds an id field to a type
- `Result<T, E>` - Represents success/failure results
- `Paginated<T>` - For paginated responses
- `Immutable<T>` - Makes a type immutable

```typescript
// Example of utility type usage
type UserProfile = Nullable<User>;
// Equivalent to: { id: string | null; email: string | null; ... }

type PartialProduct = Optional<Product>;
// Equivalent to: { id?: string; name?: string; ... }

type UserWithId = WithId<UserInput, string>;
// Equivalent to: UserInput & { id: string }
```

### Conditional Types

Use conditional types to create dynamic type relationships:

```typescript
// Example of conditional typing
type ExtractId<T> = T extends { id: infer U } ? U : never;

type UserId = ExtractId<User>; // string
```

### Generic Patterns

Use generics to create reusable type patterns:

```typescript
// Example of generic pattern
function createApiEndpoint<TData, TParams = void>(path: string) {
  return {
    fetch: (params: TParams): Promise<TData> => {
      // Implementation...
    },
  };
}

const userEndpoint = createApiEndpoint<User, { id: string }>('/users');
```

## Type Validation

### Runtime Type Validation with Zod

For runtime type validation, we use the Zod library:

```typescript
import { z } from 'zod';

// Define a schema
const UserSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  name: z.string().optional(),
  credits: z.number().int().nonnegative(),
});

// Type inference from schema
type UserFromSchema = z.infer<typeof UserSchema>;

// Validation
function validateUser(data: unknown): UserFromSchema {
  return UserSchema.parse(data);
}
```

### Form Validation Patterns

Integrate Zod with form libraries for type-safe form validation:

```typescript
const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

type FormData = z.infer<typeof formSchema>;

function validateForm(data: unknown): FormData {
  return formSchema.parse(data);
}
```

### API Response Validation

Validate API responses using Zod schemas:

```typescript
async function fetchProducts(): Promise<Product[]> {
  const response = await fetch('/api/products');
  const data = await response.json();
  return ProductArraySchema.parse(data);
}
```

## Examples and Anti-patterns

### Correct Type Usage Examples

```typescript
// Good: Using discriminated unions
type NotificationType =
  | { type: 'success'; message: string }
  | { type: 'error'; message: string; errors?: string[] }
  | { type: 'warning'; message: string; action?: () => void };

// Good: Proper null handling
function getUserName(user: User | null): string {
  return user?.name ?? 'Guest';
}

// Good: Type narrowing with guards
function processValue(value: unknown): number {
  if (typeof value === 'number') {
    return value * 2;
  }
  if (typeof value === 'string' && !isNaN(Number(value))) {
    return Number(value) * 2;
  }
  throw new Error('Invalid value type');
}
```

### Anti-patterns to Avoid

```typescript
// Bad: Using 'any'
function processData(data: any): any {
  return data.value;
}

// Bad: Type assertion without checks
function getUserEmail(user: unknown): string {
  return (user as User).email; // Can cause runtime errors
}

// Bad: Non-null assertion without certainty
function processUser(user?: User): string {
  return user!.email; // Will crash if user is undefined
}

// Good alternatives:
function processDataSafely(data: unknown): unknown {
  if (isObject(data) && hasProperty(data, 'value')) {
    return data.value;
  }
  throw new Error('Invalid data structure');
}

function getUserEmailSafely(user: unknown): string {
  if (isUser(user)) {
    return user.email;
  }
  throw new Error('Invalid user object');
}

function processUserSafely(user?: User): string {
  if (!user) {
    throw new Error('User is required');
  }
  return user.email;
}
```

---

By following these standards and best practices, we maintain a high level of type safety throughout our codebase, preventing many common errors at compile-time and making our code more maintainable and self-documenting.
