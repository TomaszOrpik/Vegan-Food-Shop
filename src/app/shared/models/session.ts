import { Page } from './page';
import { CartItemAction } from './cartItemAction';
import { BuyedItem } from './BuyedItem';
import { SessionScrap } from './sessionScrap';

export class Session {
    userId: string;
    sessionId: string;
    userIp: string;
    visitCounter: number;
    visitDate: string;
    device: string;
    browser: string;
    location: string;
    reffer: string;
    pages: Page[];
    cartItems: CartItemAction[];
    buyedItems: BuyedItem[];
    didLogged: boolean;
    didContacted: boolean;
    sessionScrap: SessionScrap[];

    constructor(
        userId = '',
        sessionId = '',
        userIp = '',
        visitCounter = 0,
        visitDate = '',
        device = '',
        browser = '',
        location = '',
        reffer = '',
        pages = [],
        cartItems = [],
        buyedItems = [],
        didLogged = false,
        didContacted = false,
        sessionScrap = []
    ) {
        this.userId = userId;
        this.sessionId = sessionId;
        this.userIp = userIp;
        this.visitCounter = visitCounter;
        this.visitDate = visitDate;
        this.device = device;
        this.browser = browser;
        this.location = location;
        this.reffer = reffer;
        this.pages = pages;
        this.cartItems = cartItems;
        this.buyedItems = buyedItems;
        this.didLogged = didLogged;
        this.didContacted = didContacted;
        this.sessionScrap = sessionScrap;
    }
}