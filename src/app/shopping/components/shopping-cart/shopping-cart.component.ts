import { ShoppingCartService } from '../../../shared/services/shopping-cart.service';
import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { ShoppingCart } from 'src/app/shared/models/shopping-cart';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnDestroy{

  @Input() cartActions = true;
  @Input() cart: ShoppingCart;

  constructor(private router: Router, private cartService: ShoppingCartService) {
    // tslint:disable-next-line: curly
    if (this.cartActions) {
      if (localStorage.getItem('VFSCart') !== null && (localStorage.getItem('VFSCart') as any).length !== 0) {
        this.cart = this.cartService.loadCart();
        document.getElementById('cartCounter').innerHTML = this.cart.totalItemsCount().toString();
        console.log(this.cart);
      }
      else this.cart = new ShoppingCart();
    }
  }

  toCheckOut(cart: ShoppingCart) {
    this.cartService.saveCart(cart);
    document.getElementById('cartCounter').innerHTML = this.cart.totalItemsCount().toString();
    this.router.navigate(['/kasa']);
  }

  clearCart() {
    this.cart.clearCart();
    document.getElementById('cartCounter').innerHTML = this.cart.totalItemsCount().toString();
    this.cartService.saveCart(this.cart);
  }

  ngOnDestroy() {
    if (this.cartActions) this.cartService.saveCart(this.cart);
  }
}
