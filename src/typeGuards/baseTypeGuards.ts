/**
 * Base Type Guards
 *
 * Fundamental type guards for checking primitive types and basic structures.
 * These are utility functions used across the application to ensure type safety.
 */

/**
 * Checks if a value is defined (not null or undefined).
 *
 * @param value - Any value to check
 * @returns True if the value is neither null nor undefined
 */
export function isDefined<T>(value: T | null | undefined): value is T {
  return value !== null && value !== undefined;
}

/**
 * Checks if a value is an object (excluding null).
 *
 * @param value - Any value to check
 * @returns True if the value is an object and not null
 */
export function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

/**
 * Checks if a value is an array.
 *
 * @param value - Any value to check
 * @returns True if the value is an array
 */
export function isArray(value: unknown): value is unknown[] {
  return Array.isArray(value);
}

/**
 * Checks if a value is a string.
 *
 * @param value - Any value to check
 * @returns True if the value is a string
 */
export function isString(value: unknown): value is string {
  return typeof value === 'string';
}

/**
 * Checks if a value is a number.
 *
 * @param value - Any value to check
 * @returns True if the value is a number and not NaN
 */
export function isNumber(value: unknown): value is number {
  return typeof value === 'number' && !isNaN(value);
}

/**
 * Checks if a value is a boolean.
 *
 * @param value - Any value to check
 * @returns True if the value is a boolean
 */
export function isBoolean(value: unknown): value is boolean {
  return typeof value === 'boolean';
}

/**
 * Checks if a value is a date.
 *
 * @param value - Any value to check
 * @returns True if the value is a valid Date object
 */
export function isDate(value: unknown): value is Date {
  return value instanceof Date && !isNaN(value.getTime());
}

/**
 * Checks if a value is empty (empty string, empty array, empty object).
 *
 * @param value - Any value to check
 * @returns True if the value is empty
 */
export function isEmpty(value: unknown): boolean {
  if (value === null || value === undefined) return true;
  if (typeof value === 'string') return value.trim() === '';
  if (Array.isArray(value)) return value.length === 0;
  if (isObject(value)) return Object.keys(value).length === 0;
  return false;
}

/**
 * Checks if a value has a specific property.
 *
 * @param value - Any object to check
 * @param prop - Property name to check for
 * @returns True if the object has the specified property
 */
export function hasProperty<K extends string>(
  value: unknown,
  prop: K,
): value is { [key in K]: unknown } {
  return isObject(value) && prop in value;
}

/**
 * Checks if a value is a valid record with string keys.
 *
 * @param value - Any value to check
 * @returns True if the value is a valid record object
 */
export function isRecord(value: unknown): value is Record<string, unknown> {
  return isObject(value);
}

/**
 * Checks if a value is of a specific discriminated union type.
 *
 * @param value - Object to check
 * @param discriminantProp - The property that distinguishes the type
 * @param discriminantValue - The expected value of the discriminant property
 * @returns True if the object is of the specific discriminated type
 */
export function isOfDiscriminatedType<
  T extends Record<string, unknown>,
  K extends string,
  V extends string | number | boolean
>(value: unknown, discriminantProp: K, discriminantValue: V): value is T & Record<K, V> {
  return (
    hasProperty(value, discriminantProp) &&
    value[discriminantProp] === discriminantValue
  );
}

/**
 * Verifies that a value matches a specific structure by checking required properties.
 *
 * @param value - Object to check
 * @param requiredProps - Array of required property names
 * @returns True if the object has all required properties
 */
export function hasRequiredProperties<P extends string>(
  value: unknown,
  requiredProps: P[],
): value is { [K in P]: unknown } {
  if (!isObject(value)) return false;
  return requiredProps.every((prop) => prop in value);
}

/**
 * Asserts that a condition is true, throwing an error if it's not.
 * Use this for runtime assertions that are more specific than TypeScript's type checking.
 *
 * @param condition - Condition to check
 * @param message - Optional error message
 */
export function assert(
  condition: unknown,
  message = 'Assertion failed',
): asserts condition {
  if (!condition) {
    throw new Error(message);
  }
}

/**
 * Verifies that a value is a valid non-empty array.
 *
 * @param value - Value to check
 * @returns True if the value is a non-empty array
 */
export function isNonEmptyArray<T>(value: unknown): value is T[] {
  return Array.isArray(value) && value.length > 0;
}

/**
 * Type guard for checking if a value implements a specific interface with required methods.
 *
 * @param value - Object to check
 * @param requiredMethods - Array of method names that should exist on the object
 * @returns True if the object implements all required methods
 */
export function implementsInterface<M extends string>(
  value: unknown,
  requiredMethods: M[],
): value is { [K in M]: Function } {
  if (!isObject(value)) return false;
  return requiredMethods.every(
    (method) =>
      hasProperty(value, method) && typeof value[method] === 'function',
  );
}
