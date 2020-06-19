import { ShoppingCartService } from '../../../shared/services/shopping-cart.service';
import { Component, OnInit, Input } from '@angular/core';
import { ShoppingCart } from 'src/app/shared/models/shopping-cart';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
  cart$: Promise<ShoppingCart>;

  // tslint:disable-next-line: no-input-rename
  @Input('cartActions') cartActions = true;

  constructor(private shoppingCartService: ShoppingCartService) { }

  async ngOnInit() {
    this.cart$ = this.shoppingCartService.getCart();
  }

  clearCart() {
    this.shoppingCartService.clearCart();
  }
}
