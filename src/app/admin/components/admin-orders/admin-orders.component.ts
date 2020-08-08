import { Order } from '../../../shared/models/order';
import { OrderService } from '../../../shared/services/order.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.css']
})
export class AdminOrdersComponent {
  orders$: Observable<Order[]>;

  constructor(private orderService: OrderService) {
    this.orders$ = orderService.getOrders().valueChanges() as Observable<Order[]>;
  }

  ProductClick(order: Order) {
    const newLine = '\r\n';
    let msg = 'Szczegóły:';
    msg += newLine;
    msg += `Nazwisko: ${order.shipping.name} ${order.shipping.surname}`;
    msg += newLine;
    msg += `Adres: ${order.shipping.street}`;
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
