import { ShoppingCartService } from '../../../shared/services/shopping-cart.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { ShoppingCart } from 'src/app/shared/models/shopping-cart';
import { ShoppingCartItem } from 'src/app/shared/models/shopping-cart-item';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent {
  cart: ShoppingCart;

  constructor(private cartService: ShoppingCartService) {
    if (localStorage.getItem('VFSCart') !== null && (localStorage.getItem('VFSCart') as any).length !== 0) {
      this.cart = this.cartService.loadCart();
      document.getElementById('cartCounter').innerHTML = this.cart.totalItemsCount().toString();
    }
    else this.cart = new ShoppingCart();
    console.log(this.cart);
  }

}
