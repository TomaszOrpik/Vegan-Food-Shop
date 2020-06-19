
export class ShoppingCartItem {
  title: string;
  imageUrl: string;
  price: number;
  quantity: number;

  constructor(title: string, imageUrl: string, price: number, quantity: number) {
      this.title = title;
      this.imageUrl = imageUrl;
      this.price = price;
      this.quantity = quantity;
  }

  get totalPrice() { return this.price * this.quantity; }
}
