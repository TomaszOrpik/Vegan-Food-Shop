import { ShoppingCartService } from '../../services/shopping-cart.service';
import { Product } from '../../models/product';
import { Component, OnInit, Input } from '@angular/core';
import { ShoppingCart } from '../../models/shopping-cart';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'product-quantity',
  templateUrl: './product-quantity.component.html',
  styleUrls: ['./product-quantity.component.css']
})
export class ProductQuantityComponent  {

  @Input() product: Product;
  @Input() shoppingCart: ShoppingCart;
  @Input() quantityActions = true;

  constructor() { }

  addToCart() {
    this.shoppingCart.addItem(this.product);
    document.getElementById('cartCounter').innerHTML = this.shoppingCart.totalItemsCount().toString();
  }

  removeFromCart() {
    this.shoppingCart.removeItem(this.product);
    document.getElementById('cartCounter').innerHTML = this.shoppingCart.totalItemsCount().toString();
  }


}
