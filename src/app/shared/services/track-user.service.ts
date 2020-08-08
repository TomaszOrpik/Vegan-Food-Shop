import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DeviceDetectorService } from 'ngx-device-detector';
import { DatePipe } from '@angular/common';
import { environment } from 'src/environments/environment';
import { User } from '../models/user';
import { UserService } from './user.service';
import { userInfo } from 'os';

@Injectable()
export class TrackUserService {

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
            },
            error: error => console.error('There was error', error)
          });
        });
    });

     return userId;
   }
   // 4x post to create to pages to cartItems to buyedItems
   private postUser(user: User)
{
     return this.http.post('http://localhost:3000/sessions', {
      sessionId : user.userId,
      userIp : user.userIp,
      visitDate : user.dateOfVisit,
      device : user.device,
      browser : user.browser,
      location : user.location,
      reffer : user.reffer
      });
   }

   public postPage()
   {

   }

   public postCartItems()
   {

   }

   public postBuyedItems()
   {

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
