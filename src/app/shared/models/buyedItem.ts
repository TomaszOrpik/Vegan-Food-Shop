
export class BuyedItem {
    itemName: string;
    itemQuantity: number;

    constructor(itemName = '', itemQuantity = 0) {
        this.itemName = itemName;
        this.itemQuantity = itemQuantity;
    }
}
