import { Component, OnInit, Input, OnDestroy, ViewEncapsulation } from '@angular/core';
import { AverageData } from 'src/app/shared/models/averageData';
import { GetUsersDataService } from 'src/app/shared/services/get-users-data.service';
import { Subscription } from 'rxjs';
import { Session } from 'src/app/shared/models/session';

import * as CanvasJS from 'src/assets/canvasjs.min';
import { Page } from 'src/app/shared/models/page';
import { BuyedItem } from 'src/app/shared/models/BuyedItem';
import { GenerateAverageDataService } from 'src/app/shared/services/generate-average-data.service';

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

  subAll: Subscription;

  constructor(private getUserData: GetUsersDataService, private genAverageData: GenerateAverageDataService) { }

  ngOnInit(): void {
    if (this.user === 'global')
      this.subAll = this.getUserData.getGlobalSessions().subscribe((resSS: Session[]) => {
          this.sessionsList = resSS;
          this.averageData = this.genAverageData.getAverage(resSS);
      });
    else {
      this.isUser = true;
      this.subAll = this.getUserData.getUserSessions(this.user).subscribe((res: Session[]) => {
        this.sessionsList = res;
        const dataRounded = this.genAverageData.getAverage(res);
        dataRounded.userIp = res[0].userIp;
        this.averageData = dataRounded;
      });
    }
  }

  averageClicked() {
    this.isAverage = true;
  }

  sessionClicked(session: Session) {
    this.isAverage = false;
    this.acvtiveSession = session;

    const dataPages: {y: number, name: string }[] = [];
    const dataBuyed: {y: number, name: string}[] = [];
    session.pages.forEach((page: Page) => {
      dataPages.push({y: page.timeOn, name: page.name});
    });
    session.buyedItems.forEach((item: BuyedItem) => {
      dataBuyed.push({y: item.itemQuantity, name: item.itemName});
    });
    setTimeout(() => {
      const pagesChart = new CanvasJS.Chart('pagesContainer', {
        theme: 'light2',
        animationEnabled: true,
        exportEnabled: true,
        title: {
          text: 'Czas na Stronach'
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
    }, 500);
    setTimeout(() => {
      const buyedChart = new CanvasJS.Chart('buyedItemContainer', {
        theme: 'light1',
        animationEnabled: true,
        exportEnabled: true,
        title: {
          text: 'Kupione Przedmioty'
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
    }, 1000);
  }

  ngOnDestroy() {
    this.subAll.unsubscribe();
  }


  //also here will be display activity button to display all interaction with site

  //users page generate as list of accordion panel which have Page Activity component for Each of them  
  //
  //also add buttons and functions for save data to excel and to csv file
}
