import { ShoppingCartService } from '../../../shared/services/shopping-cart.service';
import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { ShoppingCart } from 'src/app/shared/models/shopping-cart';
import { Router } from '@angular/router';
import { TrackUserService } from 'src/app/shared/services/track-user.service';
import { PageActivityService } from 'src/app/shared/services/page-activity.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit, OnDestroy{

  @Input() cartActions = true;
  @Input() cart: ShoppingCart;

  count = 0;

  constructor(private router: Router,
              private cartService: ShoppingCartService,
              private trackUser: TrackUserService,
              private pageActiviy: PageActivityService) {
    if (this.cartActions)
      if (localStorage.getItem('VFSCart') !== null && (localStorage.getItem('VFSCart') as any).length !== 0) {
        this.cart = this.cartService.loadCart();
        document.getElementById('cartCounter').innerHTML = this.cart.totalItemsCount().toString();
      }
      else this.cart = new ShoppingCart();
  }

  toCheckOut(cart: ShoppingCart, elementId: string) {
    this.pageActiviy.ElClicked(elementId);
    this.cartService.saveCart(cart);
    document.getElementById('cartCounter').innerHTML = this.cart.totalItemsCount().toString();
    this.router.navigate(['/kasa']);
  }

  clearCart(elementId: string) {
    this.pageActiviy.ElClicked(elementId);
    this.cart.clearCart();
    document.getElementById('cartCounter').innerHTML = this.cart.totalItemsCount().toString();
    this.cartService.saveCart(this.cart);
    const sessionId = localStorage.getItem('sessionId');
    if (sessionId !== 'Admin')
      this.trackUser.postCartItems(sessionId, 'Opróżnienie Koszyka', 'Usuń');
  }

  ngOnInit() {
    if (this.cartActions)
    setInterval(() => this.count = this.increaseCount(this.count), 1000);
  }

  increaseCount(count): number {
    return count + 1;
  }

  ngOnDestroy() {
    if (this.cartActions) {
      this.cartService.saveCart(this.cart);
      const sessionId = localStorage.getItem('sessionId');
      if (sessionId !== 'Admin')
        this.trackUser.postPage(sessionId, 'Koszyk', this.count);
    }
  }
}
