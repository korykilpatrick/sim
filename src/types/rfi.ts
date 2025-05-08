import { Geometry } from 'geojson'; // For targetArea, if using GeoJSON

export type RFIStatus =
  | 'submitted'
  | 'pending_review'
  | 'in_progress'
  | 'awaiting_customer_info'
  | 'completed'
  | 'cancelled'
  | 'on_hold'
  | 'escalated';

export interface RFITimeRange {
  start?: string; // ISO 8601 date string
  end?: string; // ISO 8601 date string
}

// For now, additionalDetails can be a flexible object.
// In a real system, this might be more structured or a JSON string.
export type RFIAdditionalDetails = Record<string, any> | string;

export interface RFI {
  id: string;
  userId: string;
  title: string;
  description: string;
  // For targetArea, using Geometry | string to allow for GeoJSON or simpler text representation.
  // For a mock, a string like "Gulf of Mexico" or specific coordinates might be simpler than full GeoJSON.
  targetArea?: Geometry | string;
  dateRange?: RFITimeRange;
  additionalDetails?: RFIAdditionalDetails;
  status: RFIStatus;
  createdAt: string; // ISO 8601 date string
  updatedAt: string; // ISO 8601 date string
  // Optional fields for a more complete system:
  // assignedTo?: string; // User ID of analyst
  // priority?: 'low' | 'medium' | 'high';
  // resolutionSummary?: string;
  // relatedCaseIds?: string[];
}
