import { Observable } from 'rxjs/Observable';
import { ShoppingCart } from '../models/shopping-cart';
import { Product } from '../models/product';
import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/map';
import { ShoppingCartItem } from '../models/shopping-cart-item';

@Injectable()
export class ShoppingCartService {

  saveCart(cart: ShoppingCart) { localStorage.setItem('VFSCart', JSON.stringify(cart)); }

  loadCart(): ShoppingCart {
    let cart: ShoppingCart;
    if (localStorage.getItem('VFSCart')) {
      const tempCart: any = JSON.parse(localStorage.getItem('VFSCart'));
      cart = new ShoppingCart();
      tempCart.items.forEach((item: {
        id: string;
        title: string;
        imageUrl: string;
        price: number;
        quantity: number; }) => {
      cart.items.push(new ShoppingCartItem(
        item.id,
        item.title,
        item.imageUrl,
        item.price,
        item.quantity
      ));
    });
    }
    else cart = new ShoppingCart();

    return cart;
  }
}
