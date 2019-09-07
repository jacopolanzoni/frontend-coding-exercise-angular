import { HttpClient } from '@angular/common/http';

import { OrdersService } from './orders.service';
import { Observable } from 'rxjs';
import { OrderPage } from '../interfaces/order-page';
import { Order } from '../interfaces/order';

describe('OrdersService', () => {

  let service: OrdersService;

  const mockHttpClient: jasmine.SpyObj<HttpClient> = jasmine.createSpyObj('HttpClient', ['get']);

  beforeEach(() => {
    service = new OrdersService(mockHttpClient);
  });

  afterEach(() => {
    mockHttpClient.get.calls.reset();
  })

  it('should fetch orders from the correct URL by a HTTP GET request', (done) => {
    // given
    const orders: Order[] = [];
    mockHttpClient.get.and.returnValue(Observable.of({
      items: orders
    } as OrderPage));
    // when
    service.getOrders().subscribe((orders: Order[]) => {
      // then
      expect(mockHttpClient.get).toHaveBeenCalled();
      const getCallInfo: jasmine.CallInfo = mockHttpClient.get.calls.mostRecent();
      expect(getCallInfo.args[0]).toBe('http://localhost:4300/orders');
      expect(getCallInfo.args[1].params.page).toBe('1');
      expect(orders).toBe(orders);
      done();
    });
  });

  it('should fetch further orders pages from the correct URL by a HTTP GET request', (done) => {
    // given
    const orders: Order[] = [];
    mockHttpClient.get.and.returnValue(Observable.of({
      items: orders
    } as OrderPage));
    // when
    service.getOrders(2).subscribe((orders: Order[]) => {
      // then
      expect(mockHttpClient.get).toHaveBeenCalled();
      const getCallInfo: jasmine.CallInfo = mockHttpClient.get.calls.mostRecent();
      expect(getCallInfo.args[0]).toBe('http://localhost:4300/orders');
      expect(getCallInfo.args[1].params.page).toBe('2');
      expect(orders).toBe(orders);
      done();
    });
  });

});
