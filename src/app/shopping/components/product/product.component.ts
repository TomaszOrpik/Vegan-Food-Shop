import { Component, OnInit, Input } from '@angular/core';
import { ProductService } from '../../../shared/services/product.service';
import { Product } from '../../../shared/models/product';
import { Router, ActivatedRoute } from '@angular/router';
import { ShoppingCartService } from '../../../shared/services/shopping-cart.service';
import { ShoppingCart } from 'src/app/shared/models/shopping-cart';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  id: string;
  product;
  cart: ShoppingCart;

  constructor(
    private productService: ProductService,
    private cartService: ShoppingCartService,
    private route: ActivatedRoute
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
  }

  addToCart() {
    this.cart.addItem(this.product);
    document.getElementById('cartCounter').innerHTML = this.cart.totalItemsCount().toString();
    this.cartService.saveCart(this.cart);
  }

  removeFromCart() {
    this.cart.removeItem(this.product);
    console.log(this.cart.totalItemsCount());
    document.getElementById('cartCounter').innerHTML = this.cart.totalItemsCount().toString();
    this.cartService.saveCart(this.cart);
  }


}
