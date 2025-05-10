// User and Authentication
export type { User } from './user';
export type { LoginRequest, RegisterRequest, AuthResponse } from './auth';

// Product Types
export type { ProductType, BaseProduct, MaritimeAlertProduct } from './product';
export type {
  VTSProductConfiguration,
  AMSProductConfiguration,
  FTSProductConfiguration,
  ReportComplianceProductConfiguration,
  ReportChronologyProductConfiguration,
  InvestigationProductConfiguration,
  MaritimeAlertProductConfiguration,
  ProductConfigurationType,
} from './productConfiguration';

// Payment and Order Types
export type { PaymentGatewayDetails } from './payment';
export type {
  OrderItem,
  OrderStatus,
  PaymentMethod,
  Order,
  CreateOrderRequestBody,
} from './order';
export type { UserProductStatus, UserProduct } from './userProduct';
export type { CartItem } from './cart';
export type { CreditTransaction } from './credits';
export type {
  CheckoutFormValues,
  PaymentMethod as CheckoutPaymentMethod,
} from './checkout';

// RFI Types
export type {
  RFI,
  RFIStatus,
  RFITimeRange,
  RFIAdditionalDetails,
  CreateRfiRequestBody,
  UpdateRfiRequestBody,
} from './rfi';

// Alert Types
export * from './alertConfiguration';
export type { AlertNotification } from './alert';

// Utility Types
export type {
  Nullable,
  Optional,
  Required,
  Immutable,
  DeepImmutable,
  ArrayElement,
  WithId,
  Discriminate,
  PickType,
  OmitType,
  Result,
  Paginated,
  FilterKeys,
  PickByValueType,
  ValidatedRequest,
  TypedRecord,
  ApiStatus,
  ApiState,
} from './utility';
