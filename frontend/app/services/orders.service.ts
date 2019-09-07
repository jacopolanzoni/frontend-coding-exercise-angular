import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';

import { Order } from '../interfaces/order';
import { OrderPage } from '../interfaces/order-page';

@Injectable()
export class OrdersService {

  private readonly host: string = 'http://localhost:4300';

  constructor(
    private readonly httpClient: HttpClient
  ) {}

  public getOrders(page?: number): Observable<Order[]> {
    return this.getOrdersPage(page).pipe(
      map((orderPage: OrderPage) => orderPage.items)
    );
  }

  private getOrdersPage(page?: number): Observable<OrderPage> {
    const url: string = `${this.host}/orders`;
    const params = {
      page: page ? page.toString() : '1'
    };
    return this.httpClient.get<OrderPage>(url, { params });
  }

}