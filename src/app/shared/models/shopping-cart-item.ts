
export class ShoppingCartItem {
  id: string;
  title: string;
  imageUrl: string;
  price: number;
  quantity: number;

  constructor(id, title, imageUrl, price, quantity) {
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.price = price;
    this.quantity = quantity;
  }

  get totalPrice() { return this.price * this.quantity; }
}
