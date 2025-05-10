import { Geometry as _Geometry } from 'geojson';

/**
 * Enumeration of all product types available in the system.
 * This is used as a discriminant field in product interfaces.
 *
 * @example
 * // Used as a discriminant in product objects
 * const product = {
 *   id: '123',
 *   type: 'VTS' as ProductType,
 *   // ... other fields
 * };
 */
export type ProductType =
  | 'VTS'        // Vessel Tracking Service
  | 'AMS'        // Area Monitoring Service
  | 'FTS'        // Fleet Tracking Service
  | 'REPORT_COMPLIANCE'
  | 'REPORT_CHRONOLOGY'
  | 'INVESTIGATION'
  | 'MARITIME_ALERT';

/**
 * Base interface that all product objects extend.
 * Contains common fields that all products must have.
 *
 * @property id - Unique identifier for the product
 * @property name - Display name shown to users
 * @property shortDescription - Brief description for listings
 * @property longDescription - Detailed product description
 * @property type - Discriminant field for product type
 * @property price - Cost in currency units
 * @property creditCost - Alternative cost in platform credits
 * @property imageUrl - Optional URL to product image
 * @property tags - Optional array of searchable tags
 */
export interface BaseProduct {
  id: string;
  name: string;
  shortDescription: string;
  longDescription: string;
  type: ProductType;
  price: number;
  creditCost: number;
  imageUrl?: string;
  tags?: string[];
}

/**
 * Maritime Alert product variant that extends the base product.
 * Includes specialized fields for alert configuration.
 *
 * @extends BaseProduct
 * @property type - Always 'MARITIME_ALERT' for this product type
 * @property alertTypesAvailable - Types of alerts this product supports
 *
 * @example
 * const maritimeProduct: MaritimeAlertProduct = {
 *   id: "ma-001",
 *   name: "Maritime Alert Package",
 *   type: "MARITIME_ALERT",
 *   // ... other base fields
 *   alertTypesAvailable: ["SHIP", "AREA"]
 * };
 */
export interface MaritimeAlertProduct extends BaseProduct {
  type: 'MARITIME_ALERT';
  alertTypesAvailable: Array<'SHIP' | 'AREA' | 'SHIP_AND_AREA'>;
} 