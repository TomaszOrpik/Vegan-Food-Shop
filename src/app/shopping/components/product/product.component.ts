import { Component, OnInit, Input } from '@angular/core';
import { ProductService } from 'shared/services/product.service';
import { Product } from 'shared/models/product';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  id: string;
  product: Product;

  constructor(
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];

    this.productService.get(this.id).subscribe(
      product => this.product = product
    );

    console.log(this.product);
  }


}
