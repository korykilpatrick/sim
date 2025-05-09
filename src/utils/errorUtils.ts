export interface KnownError {
  message: string;
  name?: string;
  stack?: string;
}

export function mapErrorToKnownType(error: unknown): KnownError {
  if (error instanceof Error) {
    return {
      message: error.message,
      name: error.name,
      stack: error.stack,
    };
  }
  return {
    message: "An unknown error occurred.",
    name: "UnknownError",
  };
} 