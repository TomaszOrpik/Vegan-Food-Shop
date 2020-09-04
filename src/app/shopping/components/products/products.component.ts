import { ShoppingCartService } from '../../../shared/services/shopping-cart.service';
import { Product } from '../../../shared/models/product';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../../shared/services/product.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { AngularFireList } from 'angularfire2/database';
import { ShoppingCart } from 'src/app/shared/models/shopping-cart';
import { TrackUserService } from 'src/app/shared/services/track-user.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, OnDestroy  {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  category: string;
  cart: ShoppingCart;
  getAll: AngularFireList<unknown>;
  contactVisible = false;
  screenSize: number;

  count = 0;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private shoppingCartService: ShoppingCartService,
    private trackUser: TrackUserService
  ) {
    this.getAll = this.productService.getAll();
    this.screenSize = window.innerWidth;
  }

  ngOnInit() {
    if (localStorage.getItem('VFSCart') !== null && (localStorage.getItem('VFSCart') as any).length !== 0) {
      this.cart = this.shoppingCartService.loadCart();
      document.getElementById('cartCounter').innerHTML = this.cart.totalItemsCount().toString();
    }
    else this.cart = new ShoppingCart();

    this.route.queryParams
    .subscribe(params => {
      this.contactVisible = params.kontakt;
    });
    this.populateProducts();

    setInterval(() => this.count = this.increaseCount(this.count), 1000);
  }

  private populateProducts() {
    this.getAll.valueChanges()
    .switchMap((products: Product[]) => {
      this.products = products;
      this.getAll.snapshotChanges().subscribe((snap) => {
          for ( let i = 0; i < snap.length; i++) this.products[i].id = snap[i].key;
        });
      return this.route.queryParamMap; })
        .subscribe(params => {
          this.category = params.get('category');
          this.applyFilter();
        });
      }

      private applyFilter() {
        this.filteredProducts = (this.category) ?
        this.products.filter(p => p.category === this.category) :
        this.products;
      }

  increaseCount(count): number {
    return count + 1;
  }

  ngOnDestroy() {
    this.shoppingCartService.saveCart(this.cart);
    const sessionId = localStorage.getItem('sessionId');
    if (sessionId !== 'Admin')
      this.trackUser.postPage(sessionId, 'Sklep', this.count);
  }
}
