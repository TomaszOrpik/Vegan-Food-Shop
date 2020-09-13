
export class AverageData {
    userId?: string;
    userIp?: string;
    mostUsedDevice: string;
    mostUsedBrowser: string;
    mostPopularLocation: string;
    mostPopularReffer: string;
    averageTimeOnPages: number;
    avCartAction: string;
    avItemBuy: number;
    mostlyLogged: boolean;

    constructor(
        mostUsedDevice = '',
        mostUsedBrowser = '',
        mostPopularLocation = '',
        mostPopularReffer = '',
        averageTimeOnPages = 0,
        avCartAction = '',
        avItemBuy = 0,
        mostlyLogged = false,
        userId?: string,
        userIp?: string
    ) {
        this.mostUsedDevice = mostUsedDevice;
        this.mostUsedBrowser = mostUsedBrowser;
        this.mostPopularLocation = mostPopularLocation;
        this.mostPopularReffer = mostPopularReffer;
        this.averageTimeOnPages = averageTimeOnPages;
        this.avCartAction = avCartAction;
        this.avItemBuy = avItemBuy;
        this.mostlyLogged = mostlyLogged;
        if (this.userIp) this.userIp = userIp;
        if (this.userId) this.userId = userId;
    }
}
