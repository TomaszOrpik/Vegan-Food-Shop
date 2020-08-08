import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import { Product } from '../models/product';
import * as firebase from 'firebase';
import { databaseCopy } from '../models/databaseCopy';

@Injectable()
export class ProductService {

  constructor(private db: AngularFireDatabase) { }

  create(product) {
    return this.db.list('/products').push(product);
  }

  getAll() {
    return this.db.list('/products');
  }

  get(productId) {
    return this.db.object('/products/' + productId);
  }

  update(productId, product) {
    return this.db.object('/products/' + productId).update(product);
  }

  updateAll() {
    const ref = firebase.database().ref('products');
    ref.remove();
    this.db.object('/products/').set(databaseCopy);
  }

  delete(productId) {
    return this.db.object('/products/' + productId).remove();
  }
}
