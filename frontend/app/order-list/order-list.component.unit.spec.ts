import { async, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Observable } from 'rxjs';

import { OrderListComponent } from './order-list.component';
import { OrdersService } from '../services/orders.service';
import { Order } from '../interfaces/order';

describe('OrderListComponent', () => {

  let component: OrderListComponent;

  const mockOrdersService: jasmine.SpyObj<OrdersService> = jasmine.createSpyObj('OrdersService', ['getOrders']); 
  mockOrdersService.getOrders.and.returnValue(Observable.of());

  beforeEach(async(() => TestBed.configureTestingModule({
    declarations: [
      OrderListComponent
    ],
    providers: [
      { provide: OrdersService, useValue: mockOrdersService }
    ],
    schemas: [
      NO_ERRORS_SCHEMA
    ]
  }).compileComponents()));

  describe('- constructor -', () => {
  
    afterEach(() => {
      mockOrdersService.getOrders.calls.reset();
    });
  
    it('should fetch orders from the order service', fakeAsync(() => {
      // given
      const orders: Order[] = [];
      mockOrdersService.getOrders.and.returnValue(Observable.of(orders));
      // when
      component = TestBed.createComponent(OrderListComponent).componentInstance;
      tick();
      // then
      expect(mockOrdersService.getOrders).toHaveBeenCalled();
      expect(component.orders).toBe(orders);
    }));
  
  });

  describe('- onLoadMoreClick -', () => {

    beforeEach(() => {
      component = TestBed.createComponent(OrderListComponent).componentInstance;
    });

    afterEach(() => {
      mockOrdersService.getOrders.calls.reset();
    });

    it('should fetch more orders from the orders service and concatenate them to the existing one', fakeAsync(() => {
      // given
      mockOrdersService.getOrders.and.returnValue(Observable.of([{}, {}, {}]));
      // when
      component.orders = [{}, {}, {}] as Order[];
      component.onLoadMoreClick();
      tick();
      // then
      expect(mockOrdersService.getOrders).toHaveBeenCalledWith(2);
      expect(component.orders.length).toBe(6);
    }));

    it('should keep fetching more order pages as users click for more', () => {
      // when
      component.onLoadMoreClick();
      component.onLoadMoreClick();
      component.onLoadMoreClick();
      // then
      expect(mockOrdersService.getOrders).toHaveBeenCalledWith();
      expect(mockOrdersService.getOrders).toHaveBeenCalledWith(2);
      expect(mockOrdersService.getOrders).toHaveBeenCalledWith(3);
      expect(mockOrdersService.getOrders).toHaveBeenCalledWith(4);
    });

  });

});
