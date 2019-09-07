import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRouterModule } from './app.router';
import { HomepageComponent } from './homepage/homepage.component';
import { OrderListComponent } from './order-list/order-list.component';
import { OrdersService } from './services/orders.service';

@NgModule({
  bootstrap: [
    AppComponent
  ],
  declarations: [
    AppComponent,
    HomepageComponent,
    OrderListComponent
  ],
  imports: [
    AppRouterModule,
    BrowserModule,
    HttpClientModule
  ],
  providers: [
    OrdersService
  ]
})
export class AppModule {}
