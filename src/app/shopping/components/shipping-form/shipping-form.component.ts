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
import { TrackUserService } from 'src/app/shared/services/track-user.service';
import { ShoppingCartItem } from 'src/app/shared/models/shopping-cart-item';
import { PageActivityService } from 'src/app/shared/services/page-activity.service';

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

  count = 0;

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
    private orderService: OrderService,
    private trackUser: TrackUserService,
    private pageActivity: PageActivityService) {
  }

  ngOnInit() {
    this.userSubscription = this.authService.user$.subscribe(user => this.userId = user.uid);
    setInterval(() => this.count = this.increaseCount(this.count), 1000);
  }

  increaseCount(count): number {
    return count + 1;
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
    const sessionId = localStorage.getItem('sessionId');
    if (sessionId !== 'Admin')
      this.trackUser.postPage(sessionId, 'Podsumowanie Zamówienia', this.count);
  }

  KeyDownHandler(elementId: string) {
    this.pageActivity.collectClick(elementId);
  }

  async placeOrder(elementId: string) {
    const shipping = new Shipping(
      this.formName,
      this.formSurname,
      this.formStreet,
      this.formPostCode,
      this.formCity,
      this.formRegion
    );

    if (this.userId === null || this.userId === undefined) this.userId = '-' + Math.random().toString(36).substr(2, 21);

    this.pageActivity.ElClicked(elementId);
    const order = new Order(this.userId, shipping, this.cart);
    const result = await this.orderService.placeOrder(order);
    const sessionId = localStorage.getItem('sessionId');
    this.cart.items.forEach((item: ShoppingCartItem) => {
      if (sessionId !== 'Admin')
        this.trackUser.postBuyedItems(sessionId, item.title, item.quantity);
    });
    this.cart.clearCart();
    this.cartService.saveCart(this.cart);
    document.getElementById('cartCounter').innerHTML = this.cart.totalItemsCount().toString();
    this.router.navigate(['/podsumowanie', result.key]);
  }
}
