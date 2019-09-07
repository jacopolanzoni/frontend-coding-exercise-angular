import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Observable } from 'rxjs';

import { OrderListComponent } from './order-list.component';
import { OrdersService } from '../services/orders.service';

describe('OrderListComponent', () => {
  let fixture: ComponentFixture<OrderListComponent>;

  const mockOrdersService: jasmine.SpyObj<OrdersService> = jasmine.createSpyObj('OrdersService', ['getOrders']); 
  const order = {
    currentLocation: {},
    deliveryLocation: {},
    price: {},
    vendorLocation: {}
  };
  mockOrdersService.getOrders.and.returnValue(Observable.of([order, order, order]));

  beforeEach(async(() => TestBed.configureTestingModule({
    declarations: [
      OrderListComponent
    ],
    providers: [
      { provide: OrdersService, useValue: mockOrdersService }
    ]
  }).compileComponents()));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderListComponent);
    fixture.detectChanges();
  });

  afterEach(() => {
    mockOrdersService.getOrders.calls.reset();
  });

  it('should contain an order table', () => {
    const table = fixture.debugElement.query(By.css('table'));
    expect(table).toBeTruthy();
  });

  it('should display a row in the table for each order which has been fetched', () => {
    // given
    const order = {
      currentLocation: {},
      deliveryLocation: {},
      price: {},
      vendorLocation: {}
    };
    mockOrdersService.getOrders.and.returnValue(Observable.of([order, order, order]));
    // when
    fixture = TestBed.createComponent(OrderListComponent);
    fixture.detectChanges();    
    // then
    const tableRows = fixture.debugElement.queryAll(By.css('tr'));
    expect(tableRows.length).toBe(3 + 1);
  });

  it('should display extra rows when users click on the "Load more" button', () => {
    // when
    const button = fixture.debugElement.query(By.css('button'));
    button.triggerEventHandler('click', {});
    fixture.detectChanges();    
    // then
    const tableRows = fixture.debugElement.queryAll(By.css('tr'));
    expect(tableRows.length).toBe(3 + 3 + 1);
  });

});
