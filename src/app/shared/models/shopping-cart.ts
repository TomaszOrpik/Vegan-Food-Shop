import { Product } from './product';
import { ShoppingCartItem } from './shopping-cart-item';
import { ShoppingCartService } from '../services/shopping-cart.service';
import { Injectable } from '@angular/core';

export class ShoppingCart {
  items: ShoppingCartItem[] = [];
  id: string;

  constructor(cartId: string) {
    // this.itemsMap = itemsMap || {};
    this.id = cartId;
    // tslint:disable-next-line: prefer-const
    let shoppingCartService: ShoppingCartService;
    shoppingCartService.getItems(cartId).valueChanges()
      .subscribe((x: ShoppingCartItem[]) => this.items = x );
  }

  getQuantity(product: Product) {
    let item = this.items[product.$key];
    return item ? item.quantity : 0;
  }

  get totalPrice() {
    let sum = 0;
    // tslint:disable-next-line: curly
    for (let productId in this.items)  sum += this.items[productId].totalPrice;
    return sum;
  }

  get totalItemsCount() {
    let count = 0;
    // tslint:disable-next-line: curly
    for (let productId in this.items) count += this.items[productId].quantity;
    return count;
  }
}
