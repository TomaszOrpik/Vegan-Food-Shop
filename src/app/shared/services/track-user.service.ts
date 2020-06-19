import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
import { DeviceDetectorService } from 'ngx-device-detector';

@Injectable()
export class TrackUserService {

  userIp: string;

  constructor(
    // private http: HttpClient, 
    // private deviceDetector: DeviceDetectorService 
    ) {
    // this.getIpAddress();
   }

  //posty i gety dopisać (zwrócić user id)

  // private getIpAddress()  {
  //   return this.http.get('http://api.ipify.org/?format=json')
  //     .subscribe((response: any) =>  this.userIp = response.ip);
  //   }

  private generateId(): string { return '_' + Math.random().toString(36).substr(2, 9); }

  private getDate(): string {
    // // const dateFormat = require('dateformat');
    // const date = new Date();
    // return dateFormat(date, 'dd, mm, yyyy, h:MM:ss TT');
    return 'nie dziala';
  }

  // private getDevice(): string {
  //   // tslint:disable-next-line: curly
  //   if (this.deviceDetector.isMobile) return 'Mobile';
  //   // tslint:disable-next-line: curly
  //   if (this.deviceDetector.isTablet) return 'Tablet';
  //   // tslint:disable-next-line: curly
  //   if (this.deviceDetector.isDesktop) return 'Desktop';
  // }

  // private getBrowser(): string { return this.deviceDetector.browser; }

  private getLocation(): string {
    return 'to add';
  }

  private getReffer(): string {
    return 'to add';
  }

}
