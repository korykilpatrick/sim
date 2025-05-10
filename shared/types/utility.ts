/**
 * Collection of utility types for use throughout the application.
 * These types help ensure type safety and reduce repetition.
 */

/**
 * Makes all properties in T nullable (T | null)
 *
 * @template T - The type to transform
 *
 * @example
 * type User = { id: string; name: string; };
 * type NullableUser = Nullable<User>; // { id: string | null; name: string | null; }
 */
export type Nullable<T> = {
  [P in keyof T]: T[P] | null;
};

/**
 * Makes all properties in T optional
 *
 * @template T - The type to transform
 *
 * @example
 * type User = { id: string; name: string; };
 * type OptionalUser = Optional<User>; // { id?: string; name?: string; }
 */
export type Optional<T> = {
  [P in keyof T]?: T[P];
};

/**
 * Makes all properties in T required (removes optionality)
 *
 * @template T - The type to transform
 *
 * @example
 * type User = { id: string; name?: string; };
 * type RequiredUser = Required<User>; // { id: string; name: string; }
 */
export type Required<T> = {
  [P in keyof T]-?: T[P];
};

/**
 * Makes all properties in T readonly
 *
 * @template T - The type to transform
 *
 * @example
 * type User = { id: string; name: string; };
 * type ReadonlyUser = Immutable<User>; // { readonly id: string; readonly name: string; }
 */
export type Immutable<T> = {
  readonly [P in keyof T]: T[P];
};

/**
 * Makes all nested properties in T readonly (deep immutable)
 *
 * @template T - The type to transform
 *
 * @example
 * type User = { id: string; address: { street: string; city: string; }; };
 * type DeepReadonlyUser = DeepImmutable<User>;
 * // { readonly id: string; readonly address: { readonly street: string; readonly city: string; }; }
 */
export type DeepImmutable<T> = T extends object
  ? {
      readonly [K in keyof T]: DeepImmutable<T[K]>;
    }
  : T;

/**
 * Extracts the type of an array element
 *
 * @template ArrayType - The array type to extract from
 *
 * @example
 * type StringArray = string[];
 * type StringType = ArrayElement<StringArray>; // string
 *
 * type UserArray = Array<{ id: string; name: string; }>;
 * type User = ArrayElement<UserArray>; // { id: string; name: string; }
 */
export type ArrayElement<ArrayType extends readonly unknown[]> =
  ArrayType extends readonly (infer ElementType)[] ? ElementType : never;

/**
 * Represents an entity with an ID field
 *
 * @template T - The base type
 * @template ID - Type of the ID field (defaults to string)
 *
 * @example
 * type User = { name: string; email: string; };
 * type UserEntity = WithId<User>; // { name: string; email: string; id: string; }
 * type UserWithNumericId = WithId<User, number>; // { name: string; email: string; id: number; }
 */
export type WithId<T, ID = string> = T & { id: ID };

/**
 * Creates a discriminated union based on a specified field
 *
 * @template T - The base type
 * @template K - The discriminant key
 * @template V - The discriminant value
 *
 * @example
 * type Shape = { color: string; };
 * type Circle = Discriminate<Shape, 'type', 'circle'> & { radius: number; };
 * type Square = Discriminate<Shape, 'type', 'square'> & { sideLength: number; };
 * // Circle is { color: string; type: 'circle'; radius: number; }
 * // Square is { color: string; type: 'square'; sideLength: number; }
 */
export type Discriminate<T, K extends keyof T, V extends T[K]> = T & {
  [key in K]: V;
};

/**
 * Picks only the specified keys from a type
 * Similar to TypeScript's built-in Pick type
 *
 * @template T - The source type
 * @template K - The keys to pick
 *
 * @example
 * type User = { id: string; name: string; email: string; phone: string; };
 * type UserBasicInfo = PickType<User, 'id' | 'name'>; // { id: string; name: string; }
 */
export type PickType<T, K extends keyof T> = {
  [P in K]: T[P];
};

/**
 * Omits the specified keys from a type
 * Similar to TypeScript's built-in Omit type
 *
 * @template T - The source type
 * @template K - The keys to omit
 *
 * @example
 * type User = { id: string; name: string; password: string; };
 * type PublicUser = OmitType<User, 'password'>; // { id: string; name: string; }
 */
export type OmitType<T, K extends keyof T> = {
  [P in Exclude<keyof T, K>]: T[P];
};

/**
 * Result type for async operations that can either succeed or fail
 * Used for error handling without throwing exceptions
 *
 * @template T - The success data type
 * @template E - The error type (defaults to Error)
 *
 * @example
 * type UserResult = Result<User, ApiError>;
 *
 * // Success case
 * const successResult: UserResult = {
 *   success: true,
 *   data: { id: '123', name: 'John' }
 * };
 *
 * // Failure case
 * const failureResult: UserResult = {
 *   success: false,
 *   error: new ApiError('User not found')
 * };
 */
export type Result<T, E = Error> =
  | { success: true; data: T }
  | { success: false; error: E };

/**
 * Type for paginated responses from APIs
 * Includes both the data and pagination metadata
 *
 * @template T - The data item type
 *
 * @example
 * type UserPage = Paginated<User>;
 *
 * // API response:
 * const usersPage: UserPage = {
 *   data: [{ id: '1', name: 'Alice' }, { id: '2', name: 'Bob' }],
 *   pagination: {
 *     totalItems: 50,
 *     totalPages: 25,
 *     currentPage: 1,
 *     itemsPerPage: 2
 *   }
 * };
 */
export type Paginated<T> = {
  data: T[];
  pagination: {
    totalItems: number;
    totalPages: number;
    currentPage: number;
    itemsPerPage: number;
  };
};

/**
 * Type-safe object key filter
 * Extracts keys from T where the value extends type U
 *
 * @template T - The source object type
 * @template U - The value type to filter by
 *
 * @example
 * type User = { id: string; age: number; active: boolean; };
 * type StringKeys = FilterKeys<User, string>; // 'id'
 */
export type FilterKeys<T, U> = {
  [P in keyof T]: T[P] extends U ? P : never;
}[keyof T];

/**
 * Picks keys from T where the value extends type U
 *
 * @template T - The source object type
 * @template U - The value type to pick by
 *
 * @example
 * type User = { id: string; name: string; age: number; active: boolean; };
 * type StringProperties = PickByValueType<User, string>; // { id: string; name: string; }
 */
export type PickByValueType<T, U> = {
  [P in FilterKeys<T, U>]: T[P];
};

/**
 * Type for request parameters with validation information
 * Used for form validation and API request validation
 *
 * @template T - The data type being validated
 *
 * @example
 * type LoginForm = { email: string; password: string; };
 * type ValidatedLogin = ValidatedRequest<LoginForm>;
 *
 * const result: ValidatedLogin = {
 *   data: { email: 'user@example.com', password: '12345' },
 *   isValid: false,
 *   validationErrors: {
 *     password: ['Password must be at least 8 characters']
 *   }
 * };
 */
export type ValidatedRequest<T> = {
  data: T;
  isValid: boolean;
  validationErrors?: Record<string, string[]>;
};

/**
 * Record where values can have different types based on the key
 * Similar to Record but with stricter key typing
 *
 * @template K - The key type (must be string, number, or symbol)
 * @template T - The value type
 *
 * @example
 * type UserFields = 'id' | 'name' | 'email';
 * type UserRecord = TypedRecord<UserFields, string>;
 * // Equivalent to { id: string; name: string; email: string; }
 */
export type TypedRecord<K extends string | number | symbol, T> = {
  [P in K]: T;
};

/**
 * Type for handling API request status in UI components
 * Used primarily in Redux state slices
 *
 * @example
 * let status: ApiStatus = 'idle';
 * status = 'loading';
 * // Later
 * status = 'succeeded';
 * // Or on error
 * status = 'failed';
 */
export type ApiStatus = 'idle' | 'loading' | 'succeeded' | 'failed';

/**
 * Type for API state in Redux slices
 * Combines data, status, and error information
 *
 * @template T - The data type stored in the state
 *
 * @example
 * type UserState = ApiState<User>;
 *
 * const initialState: UserState = {
 *   data: null,
 *   status: 'idle',
 *   error: null
 * };
 *
 * // During API call
 * const loadingState: UserState = {
 *   data: null,
 *   status: 'loading',
 *   error: null
 * };
 *
 * // After successful API call
 * const successState: UserState = {
 *   data: { id: '123', name: 'John' },
 *   status: 'succeeded',
 *   error: null
 * };
 */
export type ApiState<T> = {
  data: T | null;
  status: ApiStatus;
  error: string | null;
};
