import { ShoppingCart } from '../../../shared/models/shopping-cart';
import { OrderService } from '../../../shared/services/order.service';
import { AuthService } from '../../../shared/services/auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Order } from '../../../shared/models/order';
import { Shipping } from 'src/app/shared/models/Shipping';
import { FormControl, Validators } from '@angular/forms';
import { ShoppingCartService } from 'src/app/shared/services/shopping-cart.service';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'shipping-form',
  templateUrl: './shipping-form.component.html',
  styleUrls: ['./shipping-form.component.css']
})
export class ShippingFormComponent implements OnInit, OnDestroy {
  @Input() cart: ShoppingCart;
  userSubscription: Subscription;
  userId: string;

  formName: string;
  formSurname: string;
  formStreet: string;
  formPostCode: number;
  formCity: string;
  formRegion: string;

  name = new FormControl('', [Validators.required]);
  surname = new FormControl('', [Validators.required]);
  street = new FormControl('', [Validators.required]);
  postcode = new FormControl('', [Validators.required]);
  city = new FormControl('', [Validators.required]);
  region = new FormControl('', [Validators.required]);

  constructor(
    private router: Router,
    private authService: AuthService,
    private cartService: ShoppingCartService,
    private orderService: OrderService) {
  }

  ngOnInit() {
    this.userSubscription = this.authService.user$.subscribe(user => this.userId = user.uid);
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }

  async placeOrder() {
    const shipping = new Shipping(
      this.formName,
      this.formSurname,
      this.formStreet,
      this.formPostCode,
      this.formCity,
      this.formRegion
    );
    const order = new Order(this.userId, shipping, this.cart);
    const result = await this.orderService.placeOrder(order);
    this.cart.clearCart();
    this.cartService.saveCart(this.cart);
    document.getElementById('cartCounter').innerHTML = this.cart.totalItemsCount().toString();
    this.router.navigate(['/podsumowanie', result.key]);
  }
}
