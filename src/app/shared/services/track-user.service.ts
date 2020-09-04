import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DeviceDetectorService } from 'ngx-device-detector';
import { DatePipe } from '@angular/common';
import { User } from '../models/user';

@Injectable()
export class TrackUserService {

  sessionId: string;
  apiSource = 'https://desolate-harbor-68661.herokuapp.com';

  constructor(
    private http: HttpClient,
    private deviceDetector: DeviceDetectorService
    ) { }

   public initTrackUser(): string {
     let userId: string;
     this.getIpAddress().subscribe((res: any) =>
    {
      if (res == null) {
        const user: User = {
          userId: this.generateId(),
          userIp: 'Unknown',
          dateOfVisit: this.getDate(),
          device: this.getDevice(),
          browser: this.getBrowser(),
          location: 'Unknown',
          reffer: this.getReffer()
        };
        this.postUser(user).subscribe({
          next: (data: any) => {
            console.log(data);
          },
          error: error => console.error('There was error', error)
        });
        userId = user.userId;
      }
      else
        this.getCountry(res.ip).subscribe((result: any) => {
          const user: User = {
            userId: this.generateId(),
            userIp: res.ip,
            dateOfVisit: this.getDate(),
            device: this.getDevice(),
            browser: this.getBrowser(),
            location: result.country_name,
            reffer: this.getReffer()
          };
          userId = user.userId;
          this.postUser(user).subscribe({
            next: (data: any) => {
              console.log(data);
              this.sessionId = data;
            },
            error: error => console.error('There was error', error)
          });
        });
    });
     return userId;
   }

   private postUser(user: User)
  {
     return this.http.post(this.apiSource + '/sessions', {
      sessionId : user.userId,
      userIp : user.userIp,
      visitDate : user.dateOfVisit,
      device : user.device,
      browser : user.browser,
      location : user.location,
      reffer : user.reffer
      });
   }

   public removeSession(sessionId: string) {
      return this.http.delete(`${this.apiSource}/sessions/${sessionId}`);
   }

   public postPage(sessionId: string, name: string, timeOn: number) {
      return this.http.put(`${this.apiSource}/sessions_pages/${sessionId}`, {
        name,
        timeOn
      }).subscribe(res => console.log(res));
   }

   public postCartItems(sessionId: string, itemName: string, itemAction: string) {
    return this.http.put(`${this.apiSource}/sessions_cartItems/${sessionId}`, {
      itemName,
      itemAction
    }).subscribe(res => console.log(res));
   }

   public postBuyedItems(sessionId: string, itemName: string, itemQuantity: number) {
    return this.http.put(`${this.apiSource}/sessions_buyedItems/${sessionId}`, {
      itemName,
      itemQuantity
    }).subscribe(res => console.log(res));
   }

   public postSessionScrap(sessionId: string,
                           mouseX: number,
                           mouseY: number,
                           clickedItemId: string,
                           InputId: string,
                           InputKey: string) {
    //additional post when item is clicked with id of him and user make input
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    const path = window.location.pathname;
    const query = window.location.search;
    const currentPage = path + query;
    const scrollTopPosition = window.scrollY;

    return this.http.put(`${this.apiSource}/sessions_scrap/${sessionId}`, {
      windowWidth,
      windowHeight,
      currentPage,
      scrollTopPosition,
      mouseX,
      mouseY,
      clickedItemId,
      InputId,
      InputKey
    }).subscribe(res => console.log(res));
   }

   public updateDidLogged(sessionId: string) {
    return this.http.patch(`${this.apiSource}/sessions_logged/${sessionId}`, {
      didLogged: true
    }).subscribe(res => console.log(res));
   }

   public updateDidContacted(sessionId: string) {
    return this.http.patch(this.apiSource + '/sessions_contacted/' + sessionId, {
      didContacted: true
    }).subscribe(res => console.log(res));
   }

   private getCountry(ip: string) {
     return this.http.get(`https://ipapi.co/${ip}/json/`);
   }

  private getIpAddress()  {
    return this.http.get('https://api.ipify.org/?format=json');
    }

  private generateId(): string { return '_' + Math.random().toString(36).substr(2, 9); }

  private getDate(): string {
    const pipe = new DatePipe('en-EN');
    const now = Date.now();
    const formattedDate = pipe.transform(now, 'short');
    return formattedDate;
  }

  private getDevice(): string {
    if (this.deviceDetector.isMobile()) return 'Mobile';
    if (this.deviceDetector.isTablet()) return 'Tablet';
    if (this.deviceDetector.isDesktop()) return 'Desktop';
  }

  private getBrowser(): string { return this.deviceDetector.browser; }

  private getReffer(): string { return document.referrer; }

}
