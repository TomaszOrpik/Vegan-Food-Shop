import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { ProductService } from '../../../shared/services/product.service';
import { Product } from '../../../shared/models/product';
import { Router, ActivatedRoute } from '@angular/router';
import { ShoppingCartService } from '../../../shared/services/shopping-cart.service';
import { ShoppingCart } from 'src/app/shared/models/shopping-cart';
import { TrackUserService } from 'src/app/shared/services/track-user.service';
import { PageActivityService } from 'src/app/shared/services/page-activity.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit, OnDestroy {

  id: string;
  product;
  cart: ShoppingCart;

  count = 0;

  constructor(
    private productService: ProductService,
    private cartService: ShoppingCartService,
    private route: ActivatedRoute,
    private trackUser: TrackUserService,
    private pageActivity: PageActivityService
  ) { }

  ngOnInit() {
    // tslint:disable-next-line: no-string-literal
    this.id = this.route.snapshot.params['id'];
    this.cart = this.cartService.loadCart();

    this.productService.get(this.id).valueChanges().subscribe(
      product => {
        this.product = product;
        this.product.id = this.id;
      }
    );
    setInterval(() => this.count = this.increaseCount(this.count), 1000);
  }

  addToCart(elementId: string) {
    this.pageActivity.ElClicked(elementId);
    this.cart.addItem(this.product);
    document.getElementById('cartCounter').innerHTML = this.cart.totalItemsCount().toString();
    this.cartService.saveCart(this.cart);
    const sessionId = localStorage.getItem('sessionId');
    if (sessionId !== 'Admin')
      this.trackUser.postCartItems(sessionId, this.product.title, 'Dodaj');
  }

  removeFromCart(elementId: string) {
    this.pageActivity.ElClicked(elementId);
    this.cart.removeItem(this.product);
    console.log(this.cart.totalItemsCount());
    document.getElementById('cartCounter').innerHTML = this.cart.totalItemsCount().toString();
    this.cartService.saveCart(this.cart);
    const sessionId = localStorage.getItem('sessionId');
    if (sessionId !== 'Admin')
      this.trackUser.postCartItems(sessionId, this.product.title, 'Usuń');
  }

  increaseCount(count): number {
    return count + 1;
  }

  ngOnDestroy() {
    const sessionId = localStorage.getItem('sessionId');
    if (sessionId !== 'Admin')
      this.trackUser.postPage(sessionId, 'Produkt: ' + this.product.title, this.count);
  }

}
