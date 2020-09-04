import { ShoppingCart } from '../../models/shopping-cart';
import { ShoppingCartService } from '../../services/shopping-cart.service';
import { Product } from '../../models/product';
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { TrackUserService } from '../../services/track-user.service';
import { PageActivityService } from '../../services/page-activity.service';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {

  @Input() product: Product;
  @Input() showActions = true;
  @Input() cart: ShoppingCart;

  constructor(private router: Router,
              private cartService: ShoppingCartService,
              private trackUser: TrackUserService,
              private pageActivity: PageActivityService) { }

  addToCart(elementId: string) {
    this.pageActivity.ElClicked(elementId);
    this.cart.addItem(this.product);
    document.getElementById('cartCounter').innerHTML = this.cart.totalItemsCount().toString();
    const sessionId = localStorage.getItem('sessionId');
    if (sessionId !== 'Admin')
      this.trackUser.postCartItems(sessionId, this.product.title, 'Dodaj');
  }

  redirect(elementId: string) {
    this.pageActivity.ElClicked(elementId);
    this.router.navigateByUrl('produkt/' + this.product.id);
  }
}
