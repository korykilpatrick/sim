import type { Geometry } from 'geojson'; // For targetArea, if using GeoJSON

/**
 * Possible statuses for Request for Information
 */
export type RFIStatus =
  | 'submitted'
  | 'pending_review'
  | 'in_progress'
  | 'awaiting_customer_info'
  | 'completed'
  | 'cancelled'
  | 'on_hold'
  | 'escalated';

/**
 * Time range structure for RFI requests
 */
export interface RFITimeRange {
  /** Start date in ISO 8601 format */
  start?: string;
  /** End date in ISO 8601 format */
  end?: string;
}

/**
 * Priority levels for RFI requests
 */
export type RFIPriority = 'low' | 'medium' | 'high' | 'critical';

/**
 * Attachment structure for RFI requests
 */
export interface RFIAttachment {
  /** Name of the attachment file */
  name: string;
  /** URL to access the attachment */
  url: string;
  /** MIME type of the attachment */
  type: string;
  /** File size in bytes (optional) */
  size?: number;
}

/**
 * Structured additional details for RFIs
 * Can be a string, structured object, or generic record
 */
export type RFIAdditionalDetails =
  | Record<string, unknown>
  | string
  | {
      /** Free-form notes about the RFI */
      notes?: string;
      /** Priority level of the RFI */
      priority?: RFIPriority;
      /** Categorization tags */
      tags?: string[];
      /** Files attached to the RFI */
      attachments?: RFIAttachment[];
    };

/**
 * Core RFI (Request for Information) entity
 */
export interface RFI {
  /** Unique identifier for the RFI */
  id: string;
  /** ID of the user who created the RFI */
  userId: string;
  /** Short title describing the RFI */
  title: string;
  /** Detailed description of the information being requested */
  description: string;
  /** Geographic area of interest (can be GeoJSON or string description) */
  targetArea?: Geometry | string;
  /** Time period of interest */
  dateRange?: RFITimeRange;
  /** Any additional data associated with the RFI */
  additionalDetails?: RFIAdditionalDetails;
  /** Current status of the RFI */
  status: RFIStatus;
  /** Creation timestamp in ISO 8601 format */
  createdAt: string;
  /** Last update timestamp in ISO 8601 format */
  updatedAt: string;
}

/**
 * Request payload for creating a new RFI
 */
export interface CreateRfiRequestBody {
  /** Short title describing the RFI */
  title: string;
  /** Detailed description of the information being requested */
  description: string;
  /** Geographic area of interest (can be GeoJSON or string description) */
  targetArea?: RFI['targetArea'];
  /** Time period of interest */
  dateRange?: RFITimeRange;
  /** Any additional data associated with the RFI */
  additionalDetails?: RFIAdditionalDetails;
}

/**
 * Request payload for updating an existing RFI
 */
export interface UpdateRfiRequestBody {
  /** Updated title (optional) */
  title?: string;
  /** Updated description (optional) */
  description?: string;
  /** Updated geographic area (optional) */
  targetArea?: RFI['targetArea'];
  /** Updated time period (optional) */
  dateRange?: RFITimeRange;
  /** Updated additional details (optional) */
  additionalDetails?: RFIAdditionalDetails;
  /** Updated status (optional) */
  status?: RFIStatus;
}