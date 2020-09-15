import { Product } from '../../../shared/models/product';
import { ProductService } from '../../../shared/services/product.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { AngularFireList } from 'angularfire2/database';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { LangService } from 'src/app/shared/services/lang.service';
// import { DataTableResource } from 'angular-4-data-table';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ['Nazwa', 'Opis', 'Cena', 'Akcje'];
  products: Product[] = [];
  getAll: AngularFireList<unknown>;

  subContainer: Subscription;
  subListContainer: Subscription;
  resourceString = ['Nowy Produkt', 'Przywróć Domyślne', 'Nazwa', 'Opis', 'Cena', 'Akcje', 'Edytuj', 'Usuń'];


  constructor(private productService: ProductService, private router: Router, private lang: LangService) {
    this.getAll = this.productService.getAll();
  }

  ngOnInit() {
    this.lang.getTranslations(this.resourceString);
    this.getAll.valueChanges()
    .subscribe((products: Product[]) => {
      this.products = products;
      this.getAll.snapshotChanges().subscribe((snap) => {
        for ( let i = 0; i < snap.length; i++) this.products[i].id = snap[i].key;
      });
    });
  }

  ngOnDestroy() {
    this.lang.unSubAll();
  }


  DeleteProduct(product: Product) {
    this.productService.delete(product.id);
  }

  redirect(product) {
    this.router.navigateByUrl('admin/sklep/' + product.id);
  }

  RefreshDatabase() {
    this.productService.updateAll();
  }

}
