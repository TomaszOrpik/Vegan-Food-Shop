import { Component, OnInit, Input } from '@angular/core';
import { ProductService } from '../../../shared/services/product.service';
import { Product } from '../../../shared/models/product';
import { Router, ActivatedRoute } from '@angular/router';
import { ShoppingCartService } from '../../../shared/services/shopping-cart.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  id: string;
  product;

  constructor(
    private productService: ProductService,
    private cartService: ShoppingCartService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    // tslint:disable-next-line: no-string-literal
    this.id = this.route.snapshot.params['id'];

    this.productService.get(this.id).valueChanges().subscribe(
      product => this.product = product
    );
  }

  addToCart() {
    this.cartService.addToCart(this.product);
  }

  removeFromCart() {
    this.cartService.removeFromCart(this.product);
  }


}
