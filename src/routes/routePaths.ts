/**
 * Centralized route path constants
 * 
 * Simplified to just the landing page since the membership
 * portal has been removed. Kept as a constant for consistency
 * and future extensibility.
 */
export const ROUTE_PATHS = {
  HOME: '/',
} as const;

/**
 * Type for route paths
 */
export type RoutePath = typeof ROUTE_PATHS[keyof typeof ROUTE_PATHS];
