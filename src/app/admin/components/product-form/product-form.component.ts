import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { ProductService } from '../../../shared/services/product.service';
import { CategoryService } from '../../../shared/services/category.service';
import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs/operators';
import { Product } from 'src/app/shared/models/product';
import { FormControl, Validators } from '@angular/forms';
import { MatSelect } from '@angular/material/select';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  categories$;
  product: Product;
  id;

  formName: string;
  formDescription: string;
  formPrice: string;
  formUrl: string;
  formCategory: string;

  name = new FormControl('', [Validators.required]);
  description = new FormControl('', [Validators.required]);
  price = new FormControl('', [Validators.required]);
  url = new FormControl('', [Validators.required]);
  category = new FormControl('', [Validators.required]);

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private categoryService: CategoryService,
    private productService: ProductService) {

    (categoryService.getAll() as Observable<string[]>).subscribe(c => {
      this.categories$ = c;
      console.log(this.categories$);
    });
    console.log(categoryService.getAll());
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) this.productService.get(this.id).valueChanges().pipe(take(1)).subscribe((p: Product) => {
      this.product = p;
      this.name.setValue(p.title);
      this.category.setValue(p.category);
      this.description.setValue(p.description);
      this.price.setValue(p.price);
      this.url.setValue(p.imageUrl);
    });

  }

  save(product: Product) {
    product.title = this.name.value;
    product.category = this.category.value;
    product.description = this.description.value;
    product.price = this.price.value;
    product.imageUrl = this.url.value;

    if (this.id) this.productService.update(this.id, product);
    else this.productService.create(product);

    this.router.navigate(['/admin/sklep']);
  }

  delete() {
    if (!confirm('Na pewno chcesz usunąć ten produkt?')) return;

    this.productService.delete(this.id);
    this.router.navigate(['/admin/sklep']);
  }

  ngOnInit() {
  }

}
