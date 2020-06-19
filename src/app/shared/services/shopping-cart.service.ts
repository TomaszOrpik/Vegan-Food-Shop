import { Observable } from 'rxjs/Observable';
import { ShoppingCart } from '../models/shopping-cart';
import { Product } from '../models/product';
import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/map';
import { map, take } from 'rxjs/operators';

@Injectable()
export class ShoppingCartService {

  constructor(private db: AngularFireDatabase) { }

  async getCart(): Promise<ShoppingCart> {
    const cartId = await this.getOrCreateCartId();
    let cart: ShoppingCart;

    this.db.object('/shopping-carts/' + cartId).valueChanges()
      .subscribe((x: ShoppingCart) => cart = x);
    return cart;
  }

  async addToCart(product: Product) {
    this.updateItem(product, 1);
  }

  async removeFromCart(product: Product) {
    this.updateItem(product, -1);
  }

  async clearCart() {
    const cartId = await this.getOrCreateCartId();
    this.db.object('/shopping-carts/' + cartId + '/items').remove();
  }

  private create() {
    return this.db.list('/shopping-carts').push({
      dateCreated: new Date().getTime()
    });
  }

  getItem(cartId: string, productId: string) {
    return this.db.object('/shopping-carts/' + cartId + '/items/' + productId);
  }
  getItems(cartId: string) {
    return this.db.object('/shopping-carts/' + cartId + '/items/');
  }

  private async getOrCreateCartId(): Promise<string> {
    const cartId = localStorage.getItem('cartId');
    // tslint:disable-next-line: curly
    if (cartId) return cartId;

    const result = await this.create();
    localStorage.setItem('cartId', result.key);
    return result.key;
  }

  private async updateItem(product: Product, change: number) {
    const cartId = await this.getOrCreateCartId();
    const item$ = this.getItem(cartId, product.$key);
    item$.valueChanges().pipe(take(1)).subscribe((item: Product) => {
      const quantity = (item.quantity || 0) + change;
      // tslint:disable-next-line: curly
      if (quantity === 0) item$.remove();
      // tslint:disable-next-line: curly
      else item$.update({
        title: product.title,
        description: product.description,
        imageUrl: product.imageUrl,
        price: product.price,
        quantity
    });
    });
  }
}
