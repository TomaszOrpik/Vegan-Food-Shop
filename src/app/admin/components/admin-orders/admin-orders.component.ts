import { Order } from '../../../shared/models/order';
import { OrderService } from '../../../shared/services/order.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs';
import { LangService } from 'src/app/shared/services/lang.service';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.css']
})
export class AdminOrdersComponent implements OnInit, OnDestroy {
  orders$: Observable<Order[]>;

  subContainer: Subscription;
  subListContainer: Subscription;
  resourceString = ['Zamówienia', 'Klient', 'Data', 'Przedmioty', 'Ilość', 'Cena', 'Szczegóły', 'Nazwisko', 'Adres'];

  constructor(private orderService: OrderService, private lang: LangService) {
    this.orders$ = orderService.getOrders().valueChanges() as Observable<Order[]>;
  }

  ngOnInit() {
    this.lang.getTranslations(this.resourceString);
  }

  ngOnDestroy() {
    this.lang.unSubAll();
  }

  ProductClick(order: Order) {
    const newLine = '\r\n';
    let msg = this.resourceString[6] + ':';
    msg += newLine;
    msg += `${this.resourceString[7]}: ${order.shipping.name} ${order.shipping.surname}`;
    msg += newLine;
    msg += `${this.resourceString[8]}: ${order.shipping.street}`;
    msg += newLine;
    msg += `${order.shipping.postcode} ${order.shipping.city} ${order.shipping.region}`;
    order.items.forEach(item => {
      msg += newLine;
      msg += `${item.product.title}: ${item.quantity} - ${item.totalPrice.toFixed(2)} PLN`;
    });
    alert(msg);
  }

  totalPrice(order: Order) {
    let price = 0;
    order.items.forEach(item => price += item.totalPrice);
    return price.toString();
  }

  totalQuantity(order: Order) {
    let quantity = 0;
    order.items.forEach(item => quantity += item.quantity);
    return quantity.toString();
  }
}
