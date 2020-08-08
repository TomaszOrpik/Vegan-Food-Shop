import { ShoppingCart } from './shopping-cart';
import { formatDate } from '@angular/common';

export class Order {
  datePlaced: string;
  items: any[];
  totalPrice: number;
  totalQunatity: number;

  constructor(public userId: string, public shipping: any, shoppingCart: ShoppingCart) {

    this.datePlaced = formatDate(new Date(), 'yyyy/MM/dd hh:mm', 'en');
    this.totalPrice = 0;

    this.items = shoppingCart.items.map(i => {
      return {
        product: {
          title: i.title,
          imageUrl: i.imageUrl,
          price: i.price
        },
        quantity: i.quantity,
        totalPrice: i.totalPrice
      };
    });
  }
}
