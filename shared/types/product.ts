import { Geometry as _Geometry } from 'geojson';

export type ProductType =
  | 'VTS'
  | 'AMS'
  | 'FTS'
  | 'REPORT_COMPLIANCE'
  | 'REPORT_CHRONOLOGY'
  | 'INVESTIGATION'
  | 'MARITIME_ALERT';

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

export interface MaritimeAlertProduct extends BaseProduct {
  type: 'MARITIME_ALERT';
  alertTypesAvailable: Array<'SHIP' | 'AREA' | 'SHIP_AND_AREA'>;
} 