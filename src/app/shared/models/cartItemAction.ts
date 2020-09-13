
export class CartItemAction {
    itemName: string;
    itemAction: string;

    constructor(itemName = '', itemAction = '') {
        this.itemName = itemName;
        this.itemAction = itemAction;
    }
}
