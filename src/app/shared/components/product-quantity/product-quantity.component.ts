import { ShoppingCartService } from '../../services/shopping-cart.service';
import { Product } from '../../models/product';
import { Component, OnInit, Input } from '@angular/core';
import { ShoppingCart } from '../../models/shopping-cart';
import { TrackUserService } from '../../services/track-user.service';
import { PageActivityService } from '../../services/page-activity.service';

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

  constructor(private trackUser: TrackUserService, private pageActivity: PageActivityService) { }

  addToCart(elementId: string) {
    this.pageActivity.ElClicked(elementId);
    this.shoppingCart.addItem(this.product);
    document.getElementById('cartCounter').innerHTML = this.shoppingCart.totalItemsCount().toString();
    const sessionId = localStorage.getItem('sessionId');
    if (sessionId !== 'Admin')
      this.trackUser.postCartItems(sessionId, this.product.title, 'Dodaj');
  }

  removeFromCart(elementId: string) {
    this.pageActivity.ElClicked(elementId);
    this.shoppingCart.removeItem(this.product);
    document.getElementById('cartCounter').innerHTML = this.shoppingCart.totalItemsCount().toString();
    const sessionId = localStorage.getItem('sessionId');
    if (sessionId !== 'Admin')
      this.trackUser.postCartItems(sessionId, this.product.title, 'Usuń');
  }


}
