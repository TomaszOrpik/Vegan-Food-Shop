import { Product } from '../../../shared/models/product';
import { Subscription } from 'rxjs/Subscription';
import { ProductService } from '../../../shared/services/product.service';
import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs/Observable';
import { AngularFireList } from 'angularfire2/database';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
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


  constructor(private productService: ProductService, private router: Router) {
    this.getAll = this.productService.getAll();
  }

  ngOnInit() {
    this.getAll.valueChanges()
    .subscribe((products: Product[]) => {
      this.products = products;
      this.getAll.snapshotChanges().subscribe((snap) => {
        for ( let i = 0; i < snap.length; i++) this.products[i].id = snap[i].key;
      });
    });
  }

  ngOnDestroy() {
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
