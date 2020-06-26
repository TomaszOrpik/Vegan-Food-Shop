import { ShoppingCart } from '../../models/shopping-cart';
import { ShoppingCartService } from '../../services/shopping-cart.service';
import { Product } from '../../models/product';
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {

  @Input() product: Product;
  @Input() showActions = true;
  @Input() shoppingCart: ShoppingCart;

  constructor(private cartService: ShoppingCartService, private router: Router) { }

  addToCart() {
    this.cartService.addToCart(this.product);
  }

  redirect() {
    this.router.navigateByUrl('produkt/' + this.product.$key);
  }
}
