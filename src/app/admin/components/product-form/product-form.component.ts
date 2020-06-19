import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { ProductService } from '../../../shared/services/product.service';
import { CategoryService } from '../../../shared/services/category.service';
import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs/operators';
import { Product } from 'src/app/shared/models/product';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  categories$;
  product: Product;
  id;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private categoryService: CategoryService,
    private productService: ProductService) {
    this.categories$ = categoryService.getAll();

    this.id = this.route.snapshot.paramMap.get('id');
    // tslint:disable-next-line: curly
    if (this.id) this.productService.get(this.id).valueChanges().pipe(take(1)).subscribe((p: Product) => this.product = p);
  }

  save(product) {
    // tslint:disable-next-line: curly
    if (this.id) this.productService.update(this.id, product);
    // tslint:disable-next-line: curly
    else this.productService.create(product);

    this.router.navigate(['/admin/sklep']);
  }

  delete() {
    // tslint:disable-next-line: curly
    if (!confirm('Are you sure you want to delete this product?')) return;

    this.productService.delete(this.id);
    this.router.navigate(['/admin/sklep']);
  }

  ngOnInit() {
  }

}
