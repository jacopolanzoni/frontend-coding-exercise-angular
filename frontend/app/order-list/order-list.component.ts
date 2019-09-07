import { Component } from '@angular/core';

import { LateReason } from '../enums/late-reason.enum';
import { Order } from '../interfaces/order';
import { OrdersService } from '../services/orders.service';
import { Packaging } from '../enums/packaging.enum';
import { PaymentType } from '../enums/payment-type.enum';
import { ServingStyle } from '../enums/serving-style.enum';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss']
})
export class OrderListComponent {

  public readonly googleAPI = 'https://www.google.com/maps/search/';

  public lateReasonLabel: { [key in string]: string} = {
    [LateReason.BadInstructions]: 'Bad instructions',
    [LateReason.DriverLateForPickup]: 'Driver late',
    [LateReason.Traffic]: 'Traffic',
    [LateReason.VendorLate]: 'Vendor late'
  }

  public packagingLabel: { [key in string]: string } = {
    [Packaging.Coldbox]: 'Coldbox',
    [Packaging.Hotbox]: 'Hotbox',
    [Packaging.VendorProvided]: 'Vendor'
  };

  public paymentTypeLabel: { [key in string]: string } = {
    [PaymentType.Card]: 'Card',
    [PaymentType.Cash]: 'Cash',
    [PaymentType.PayOnAccount]: 'Account'
  };

  public servingStyleLabel: { [key in string]: string } = {
    [ServingStyle.Buffet]: 'Buffet',
    [ServingStyle.IndividualPortions]: 'Portions'
  };

  public orders: Order[];

  private pageCount: number = 1;

  constructor(
    private readonly ordersService: OrdersService
  ) {
    this.ordersService.getOrders().subscribe((orders: Order[]) => {
      this.orders = orders;
    });
  }

  public onLoadMoreClick(): void {
    this.pageCount++;
    this.ordersService.getOrders(this.pageCount).subscribe((orders: Order[]) => {
      this.orders = this.orders.concat(orders);
    });
  }

}
