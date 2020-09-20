import { Component, OnInit, Input, OnDestroy, ViewEncapsulation } from '@angular/core';
import { AverageData } from 'src/app/shared/models/averageData';
import { GetUsersDataService } from 'src/app/shared/services/get-users-data.service';
import { Subscription } from 'rxjs';
import { Session } from 'src/app/shared/models/session';

import * as CanvasJS from 'src/assets/canvasjs.min';
import * as XLSX from 'xlsx';
import { ExportToCsv } from 'export-to-csv';
import { Page } from 'src/app/shared/models/page';
import { BuyedItem } from 'src/app/shared/models/BuyedItem';
import { GenerateAverageDataService } from 'src/app/shared/services/generate-average-data.service';
import { LangService } from 'src/app/shared/services/lang.service';
import { CartItemAction } from 'src/app/shared/models/cartItemAction';

@Component({
  selector: 'app-page-activity',
  templateUrl: './page-activity.component.html',
  styleUrls: ['./page-activity.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class PageActivityComponent implements OnInit, OnDestroy {

  @Input() user = 'global';

  isUser = false;
  isAverage = true;
  averageData: AverageData = new AverageData();
  acvtiveSession: Session = new Session();
  sessionsList: Session[] = [];
  sessionsNotLoaded = true;

  cartItemsNameIndex = 0;
  cartItemsActionIndex = 0;

  subAll: Subscription;

  resourceString = ['Eksportuj średnie dane do pliku EXCEL', 'Eksportuj wszystko do pliku CSV', 'Ip Użytkownika', 'Najpopularniejsze Urządzenie',
                    'Najpopularniejsza Przeglądarka', 'Najpopularniejsza Lokacja', 'Najpopularniejsze Polecenie', 'Średni Czas na Stronie', 'Średnia Operacja na Koszyku',
                    'Średnio Ilość Kupionych Przedmiotów', 'Id Użytkownika', 'Id Sesji', 'Data Wizyty', 'Urządzenie', 'Przeglądarka', 'Lokacja', 'Polecenie', 'Czy Zalogowany',
                    'Czy się Kontaktował', 'Przedmioty Dodane do Koszyka', 'Czas na Stronach', 'Kupione Przedmioty', 'Średnie Dane', 'Przeważnie Zalogowany', '', '', '',
                    '', '', ''];
  csvResourceString = ['Nazwa', 'Ilość', 'Akcja', 'Czas na stronie'];

  constructor(private getUserData: GetUsersDataService,
              private genAverageData: GenerateAverageDataService,
              private lang: LangService) { }

  ngOnInit(): void {
    this.lang.getTranslations(this.csvResourceString);
    if (this.user === 'global')
      this.subAll = this.getUserData.getGlobalSessions().subscribe((resSS: Session[]) => {
          this.sessionsList = resSS;
          this.averageData = this.genAverageData.getAverage(resSS);
          this.resourceString[25] = this.averageData.mostUsedDevice;
          this.resourceString[26] = this.averageData.mostPopularLocation;
          this.resourceString[27] = this.averageData.avCartAction;
          if (this.averageData.mostlyLogged) this.resourceString[24] = 'Tak';
          else this.resourceString[24] = 'Nie';
          this.sessionsNotLoaded = false;
          console.log(this.sessionsNotLoaded);
          setTimeout(() => {
            this.lang.getTranslations(this.resourceString);
          }, 100);
      });
    else {
      this.isUser = true;
      this.subAll = this.getUserData.getUserSessions(this.user).subscribe((res: Session[]) => {
        this.sessionsList = res;
        const dataRounded = this.genAverageData.getAverage(res);
        dataRounded.userIp = res[0].userIp;
        this.averageData = dataRounded;
        this.resourceString[25] = this.averageData.mostUsedDevice;
        this.resourceString[26] = this.averageData.mostPopularLocation;
        this.resourceString[27] = this.averageData.avCartAction;
        if (this.averageData.mostlyLogged) this.resourceString[24] = 'Tak';
        else this.resourceString[24] = 'Nie';
        this.sessionsNotLoaded = false;
        setTimeout(() => {
          this.lang.getTranslations(this.resourceString);
        }, 100);
      });
    }
  }
  averageClicked() {
    this.isAverage = true;
  }

  exportAverageToExcel() {
    const date = new Date();
    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();
    const fileName = `${this.getDateString()}VeganFoodShop${this.user}Details.xlsx`;

    const data: {type: string, value: string}[] = [];
    if (this.isUser) data.push({type: this.resourceString[2], value: this.averageData.userIp});
    if (!this.isAverage) data.push({type: this.resourceString[3], value: this.resourceString[28]});
    else data.push({type: this.resourceString[3], value: this.resourceString[25]});
    data.push({type: this.resourceString[4], value: this.averageData.mostUsedBrowser});
    if (!this.isAverage) data.push({type: this.resourceString[5], value: this.resourceString[29]});
    else data.push({type: this.resourceString[5], value: this.resourceString[26]});
    data.push({type: this.resourceString[6], value: this.averageData.mostPopularReffer});
    data.push({type: this.resourceString[7], value: this.averageData.averageTimeOnPages.toString()});
    if (this.isAverage) data.push({type: this.resourceString[8], value: this.resourceString[27]});
    data.push({type: this.resourceString[9], value: this.averageData.avItemBuy.toString()});
    if (this.isAverage) data.push({type: this.resourceString[23], value: this.resourceString[24]});

    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);
    const WorkBook: XLSX.WorkBook = { Sheets: { data: ws}, SheetNames: ['data']};
    XLSX.writeFile(WorkBook, fileName);
  }

  private getDateString(): string {
    const date = new Date();
    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();
    return `${this.formatInt(day)}.${this.formatInt(month)}.${year}`;
  }


  private formatInt(i: number): string {
    if (i < 10) return '0' + i.toString();
    else return i.toString();
  }

  exportAllToCsv() {
    const data: {
      userId: string,
      sessionId: string,
      userIp: string,
      visitDate: string,
      device: string,
      browser: string,
      location: string,
      reffer: string,
      didLogged: boolean,
      didContacted: boolean
    }[] = [];
    const pagesData: {
      sessionId: string,
      name: string,
      timeOn: number,
    }[] = [];
    const cartItemsData: {
      sessionId: string,
      itemName: string,
      itemAction: string
    }[] = [];
    const buyItemsData: {
      sessionId: string,
      name: string,
      quantity: number
    }[] = [];

    this.sessionsList.forEach(ss => {
      data.push({
        userId: ss.userId,
        sessionId: ss.sessionId,
        userIp: ss.userIp,
        visitDate: ss.visitDate,
        device: ss.device,
        browser: ss.browser,
        location: ss.location,
        reffer: ss.reffer,
        didLogged: ss.didLogged,
        didContacted: ss.didContacted
      });
      ss.pages.forEach(page => {
        pagesData.push({
          sessionId: ss.sessionId,
          name: page.name,
          timeOn: page.timeOn
        });
      });
      ss.cartItems.forEach(item => {
        cartItemsData.push({
          sessionId: ss.sessionId,
          itemName: item.itemName,
          itemAction: item.itemAction
        });
      });
      ss.buyedItems.forEach(item => {
        buyItemsData.push({
          sessionId: ss.sessionId,
          name: item.itemName,
          quantity: item.itemQuantity
        });
      });
    });
    this.createSessionCsv(data);
    this.createPagesCsv(pagesData);
    this.createCartItemsCsv(cartItemsData);
    this.createBuyItemsCsv(buyItemsData);
  }

  private createSessionCsv(data: any[]) {
    const options = {
      filename: this.getDateString() + 'VeganShopSessions',
      headers: [this.resourceString[10], this.resourceString[11], this.resourceString[2],
                this.resourceString[12], this.resourceString[13], this.resourceString[14],
                this.resourceString[15], this.resourceString[16], this.resourceString[16],
                this.resourceString[17], this.resourceString[18]],
      showLabels: true
    };
    const csvExporter = new ExportToCsv(options);
    csvExporter.generateCsv(data);
  }

  private createPagesCsv(data: any[]) {
    const options = {
      filename: this.getDateString() + 'VeganShopPages',
      headers: [this.resourceString[11], this.csvResourceString[0], this.csvResourceString[3]],
      showLabels: true
    };
    const csvExporter = new ExportToCsv(options);
    csvExporter.generateCsv(data);
  }

  private createCartItemsCsv(data: any[]) {
    const options = {
      filename: this.getDateString() + 'VeganShopCartItems',
      headers: [this.resourceString[11], this.csvResourceString[0], this.csvResourceString[2]],
      showLabels: true
    };
    const csvExporter = new ExportToCsv(options);
    csvExporter.generateCsv(data);
  }

  private createBuyItemsCsv(data: any[]) {
    const options = {
      filename: this.getDateString() + 'VeganShopBuyedItems',
      headers: [this.resourceString[11], this.csvResourceString[0], this.csvResourceString[1]],
      showLabels: true
    };
    const csvExporter = new ExportToCsv(options);
    csvExporter.generateCsv(data);
  }

  sessionClicked(session: Session) {
    this.resourceString = ['Eksportuj średnie dane do pliku EXCEL', 'Eksportuj wszystko do pliku CSV', 'Ip Użytkownika', 'Najpopularniejsze Urządzenie',
                    'Najpopularniejsza Przeglądarka', 'Najpopularniejsza Lokacja', 'Najpopularniejsze Polecenie', 'Średni Czas na Stronie', 'Średnia Operacja na Koszyku',
                    'Średnio Ilość Kupionych Przedmiotów', 'Id Użytkownika', 'Id Sesji', 'Data Wizyty', 'Urządzenie', 'Przeglądarka', 'Lokacja', 'Polecenie', 'Czy Zalogowany',
                    'Czy się Kontaktował', 'Przedmioty Dodane do Koszyka', 'Czas na Stronach', 'Kupione Przedmioty', 'Średnie Dane', 'Przeważnie Zalogowany', '', '', '',
                    '', ''];
    this.isAverage = false;
    this.acvtiveSession = session;
    this.resourceString[28] = this.acvtiveSession.device;
    this.resourceString[29] = this.acvtiveSession.location;

    session.pages.forEach((page: Page) => {
      this.resourceString.push(page.name);
    });
    session.buyedItems.forEach((buyedItem: BuyedItem) => {
      this.resourceString.push(buyedItem.itemName);
    });
    session.cartItems.forEach((cartItem: CartItemAction) => {
      this.resourceString.push(cartItem.itemName);
    });
    session.cartItems.forEach((cartItem: CartItemAction) => {
      this.resourceString.push(cartItem.itemAction);
    });

    this.cartItemsNameIndex = 32 + session.pages.length + session.buyedItems.length;
    this.cartItemsActionIndex = 33 + session.pages.length + session.buyedItems.length + session.cartItems.length;
    const dataPages: {y: number, name: string }[] = [];
    const dataBuyed: {y: number, name: string}[] = [];
    this.lang.getTranslations(this.resourceString);
    let j = 0;
    let k = 0;
    setTimeout(() => {
      for (let i = 30; i < this.resourceString.length - (2 * session.cartItems.length); i++)
      if (j < (session.pages.length)) {
        dataPages.push({y: session.pages[j].timeOn, name: this.resourceString[i]});
        j++;
      }
      else
        if (session.buyedItems[k] !== undefined) {
          dataBuyed.push({y: session.buyedItems[k].itemQuantity, name: this.resourceString[i]});
          k++;
        }
    }, 100);

    setTimeout(() => {
      const pagesChart = new CanvasJS.Chart('pagesContainer', {
        theme: 'light2',
        animationEnabled: true,
        exportEnabled: true,
        title: {
          text: this.resourceString[20]
        },
        toolTip: {
          enabled: false
        },
        data: [{
          type: 'pie',
          showInLegend: false,
          toolTipContent: '<b>{name}</b>: {y}s',
          indexLabel: '{name}: {y}s',
          dataPoints: dataPages
        }]
      });
      pagesChart.render();
    }, 200);
    setTimeout(() => {
      const buyedChart = new CanvasJS.Chart('buyedItemContainer', {
        theme: 'light1',
        animationEnabled: true,
        exportEnabled: true,
        title: {
          text: this.resourceString[21]
        },
        data: [{
          type: 'doughnut',
          showInLegend: false,
          toolTipContent: '<b>{name}</b> - {y}',
          indexLabel: '{name} - {y}',
          dataPoints: dataBuyed
        }]
      });
      buyedChart.render();
    }, 300);
  }

  ngOnDestroy() {
    this.subAll.unsubscribe();
    this.lang.unSubAll();
  }
}
