import { Component, OnInit, Input, OnDestroy, ViewEncapsulation } from '@angular/core';
import { AverageData } from 'src/app/shared/models/averageData';
import { GetUsersDataService } from 'src/app/shared/services/get-users-data.service';
import { Subscription } from 'rxjs';
import { Session } from 'src/app/shared/models/session';

import * as CanvasJS from 'src/assets/canvasjs.min';
import { Page } from 'src/app/shared/models/page';
import { BuyedItem } from 'src/app/shared/models/BuyedItem';
import { GenerateAverageDataService } from 'src/app/shared/services/generate-average-data.service';
import { LangService } from 'src/app/shared/services/lang.service';
import { CartItemAction } from 'src/app/shared/models/cartItemAction';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

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

  cartItemsNameIndex = 0;
  cartItemsActionIndex = 0;

  subAll: Subscription;

  resourceString = ['Eksportuj średnie dane do pliku EXCEL', 'Eksportuj wszystko do pliku CSV', 'Ip Użytkownika', 'Najpopularniejsze Urządzenie',
                    'Najpopularniejsza Przeglądarka', 'Najpopularniejsza Lokacja', 'Najpopularniejsze Polecenie', 'Średni Czas na Stronie', 'Średnia Operacja na Koszyku',
                    'Średnio Ilość Kupionych Przedmiotów', 'Id Użytkownika', 'Id Sesji', 'Data Wizyty', 'Urządzenie', 'Przeglądarka', 'Lokacja', 'Polecenie', 'Czy Zalogowany',
                    'Czy się Kontaktował', 'Przedmioty Dodane do Koszyka', 'Czas na Stronach', 'Kupione Przedmioty', 'Średnie Dane', 'Przeważnie Zalogowany', '', '', '',
                    '', ''];

  constructor(private getUserData: GetUsersDataService,
              private genAverageData: GenerateAverageDataService,
              private lang: LangService) { }

  ngOnInit(): void {
    if (this.user === 'global')
      this.subAll = this.getUserData.getGlobalSessions().subscribe((resSS: Session[]) => {
          this.sessionsList = resSS;
          this.averageData = this.genAverageData.getAverage(resSS);
          this.resourceString[24] = this.averageData.mostUsedDevice;
          this.resourceString[25] = this.averageData.mostPopularLocation;
          this.resourceString[26] = this.averageData.avCartAction;
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
        this.resourceString[24] = this.averageData.mostUsedDevice;
        this.resourceString[25] = this.averageData.mostPopularLocation;
        this.resourceString[26] = this.averageData.avCartAction;
        setTimeout(() => {
          this.lang.getTranslations(this.resourceString);
        }, 100);
      });
    }
  }

  averageClicked() {
    this.isAverage = true;
  }

  sessionClicked(session: Session) {
    this.isAverage = false;
    this.acvtiveSession = session;
    this.resourceString[27] = this.acvtiveSession.device;
    this.resourceString[28] = this.acvtiveSession.location;

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

    this.cartItemsNameIndex = 29 + session.pages.length + session.buyedItems.length;
    this.cartItemsActionIndex = 29 + session.pages.length + session.buyedItems.length + session.cartItems.length;

    const dataPages: {y: number, name: string }[] = [];
    let pagesIndex = 29;
    const dataBuyed: {y: number, name: string}[] = [];
    let buyedIndex = 29 + session.pages.length;
    session.pages.forEach((page: Page) => {
      dataPages.push({y: page.timeOn, name: this.resourceString[pagesIndex]});
      pagesIndex++;
    });
    session.buyedItems.forEach((item: BuyedItem) => {
      dataBuyed.push({y: item.itemQuantity, name: this.resourceString[buyedIndex]});
      buyedIndex++;
    });
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


  //also here will be display activity button to display all interaction with site

  //also add buttons and functions for save data to excel and to csv file
}
