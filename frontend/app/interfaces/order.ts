import { LateReason } from '../enums/late-reason.enum';
import { Location } from './location';
import { PaymentType } from '../enums/payment-type.enum';
import { Price } from './price';
import { ServingStyle } from '../enums/serving-style.enum';

export interface Order {
  commissionRate: number;
  currentLocation: Location;
  customer: string;
  delayMinutes: number;
  deliveredAt: string;
  deliveryLocation: Location;
  driverName: string;
  headcount: number;
  id: number;
  lastModified: string;
  lateReason: LateReason;
  packaging: string;
  paymentType: PaymentType;
  price: Price;
  requestedDeliveryDate: string;
  servingStyle: ServingStyle;
  vendor: string;
  vendorLocation: Location;
}