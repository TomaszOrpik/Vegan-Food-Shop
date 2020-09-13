import { Injectable } from '@angular/core';
import { Session } from '../models/session';
import { AverageData } from '../models/averageData';
import { Page } from '../models/page';
import { CartItemAction } from '../models/cartItemAction';
import { BuyedItem } from '../models/BuyedItem';

@Injectable({
  providedIn: 'root'
})
export class GenerateAverageDataService {

  constructor() { }

  getAverage(sessions: Session[]): AverageData {
    const devices: string[] = [];
    const browsers: string[] = [];
    const locations: string[] = [];
    const reffers: string[] = [];
    const timeOnPages: number[] = [];
    const cartActions: string[] = [];
    const itemBuys: number[] = [];
    const loggeds: boolean[] = [];

    sessions.forEach(ss => {
      devices.push(ss.device);
      browsers.push(ss.browser);
      locations.push(ss.location);
      reffers.push(ss.reffer);
      ss.pages.forEach((page: Page) => timeOnPages.push(page.timeOn));
      ss.cartItems.forEach((cartItem: CartItemAction) => cartActions.push(cartItem.itemAction));
      ss.buyedItems.forEach((buyedItem: BuyedItem) => itemBuys.push(buyedItem.itemQuantity));
      loggeds.push(ss.didLogged);
    });
    const averageData = new AverageData();

    averageData.mostUsedDevice = this.getMostPopular(devices);
    averageData.mostUsedBrowser = this.getMostPopular(browsers);
    averageData.mostPopularLocation = this.getMostPopular(locations);
    averageData.mostPopularReffer = this.getMostPopular(reffers);
    averageData.averageTimeOnPages = Math.round((this.getAverageOfNumArr(timeOnPages) + Number.EPSILON) * 100) / 100;
    averageData.avCartAction = this.getMostPopular(cartActions);
    averageData.avItemBuy = Math.round((this.getAverageOfNumArr(itemBuys) + Number.EPSILON) * 100) / 100;
    averageData.mostlyLogged = this.getMostPopularBool(loggeds);

    return averageData;
  }

  private getMostPopular(array: string[] = []): string {
    const frequency = {};
    let max = 0;
    let result: string[] = [];
    array.forEach((a) => {
        frequency[a] = (frequency[a] || 0) + 1;
        if (frequency[a] > max) {
            max = frequency[a];
            result = [a];
            return;
        }
        if (frequency[a] === max) result.push(a);
    });
    return result[0];
}

private getMostPopularBool(array: boolean[] = []): boolean {
    const frequency = {};
    let max = 0;
    let result: number[] = [];
    array.forEach((value) => {
        let a: number;
        if (value === true) a = 1;
        else a = 0;
        frequency[a] = (frequency[a] || 0) + 1;
        if (frequency[a] > max) {
            max = frequency[a];
            result = [a];
            return;
        }
        if (frequency[a] === max) result.push(a);
    });
    if (result[0] === 1) return true;
    else return false;
}

private getAverageOfNumArr(array: number[] = []): number { return (this.getSum(array) / array.length) || 0; }

private getSum(array: number[] = []): number { return array.reduce((a, b) => a + b, 0); }
}
