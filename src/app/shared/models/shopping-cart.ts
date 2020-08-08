import { Product } from './product';
import { ShoppingCartItem } from './shopping-cart-item';

export class ShoppingCart {
  items = [];

  addItem(product: Product) {
    const itemsNames = [];
    this.items.forEach(item => {
      itemsNames.push(item.title);
    });
    if (itemsNames.includes(product.title))
      this.items.forEach(item => {
        if (item.title === product.title) item.quantity += 1;
      });
    else this.items.push(new ShoppingCartItem(
      product.id,
      product.title,
      product.imageUrl,
      product.price,
      1
    ));
  }

  removeItem(product: Product) {
    this.items.forEach(item => {
      if (item.title === product.title)
        if (item.quantity === 1) this.items.splice(this.items.indexOf(item), 1);
        else  item.quantity -= 1;
    });
  }

  clearCart() {
    this.items = [];
  }

  getQuantity(product: Product): number {
    let quantity = 0;
    this.items.forEach(item => {
      if (item.title === product.title) quantity += item.quantity;
    });
    return quantity;
  }

  getPrice(product: Product): number {
    let price = 0;
    this.items.forEach(item => {
      if (item.title === product.title) price += item.price;
    });
    return price;
  }

  totalPrice() {
    let sum = 0;
    this.items.forEach(item => {
      sum += item.totalPrice;
    });
    return sum;
  }

  totalItemsCount() {
    let count = 0;
    this.items.forEach(item => {
      count = count + item.quantity;
    });
    return count;
  }
}
