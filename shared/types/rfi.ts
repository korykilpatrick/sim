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

export type RFIAdditionalDetails = Record<string, any> | string;

export interface RFI {
  id: string;
  userId: string;
  title: string;
  description: string;
  targetArea?: Geometry | string; // Restored
  dateRange?: RFITimeRange;
  additionalDetails?: RFIAdditionalDetails;
  status: RFIStatus;
  createdAt: string; // ISO 8601 date string
  updatedAt: string; // ISO 8601 date string
}

// Request body for creating an RFI
export interface CreateRfiRequestBody {
  title: string;
  description: string;
  targetArea?: RFI['targetArea']; // Restored
  dateRange?: RFITimeRange;
  additionalDetails?: RFIAdditionalDetails;
}

// Request body for updating an RFI
export interface UpdateRfiRequestBody {
  title?: string;
  description?: string;
  targetArea?: RFI['targetArea']; // Restored
  dateRange?: RFITimeRange;
  additionalDetails?: RFIAdditionalDetails;
  status?: RFIStatus;
} 