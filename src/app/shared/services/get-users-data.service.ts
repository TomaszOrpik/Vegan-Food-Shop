import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GetUsersDataService {

  apiSource = 'https://desolate-harbor-68661.herokuapp.com';

  constructor(private http: HttpClient) { }

  public getGlobalSessions() {
    return this.http.get(this.apiSource + '/sessions');
  }

  public getAverageGlobal() {
    return this.http.get(this.apiSource + '/users_average');
  }

  public getUserSessions(userId: string) {
    return this.http.get(`${this.apiSource}/sessions_user/${userId}`);
  }

  public getUserAverage(userId: string) {
    return this.http.get(`${this.apiSource}/user_average/${userId}`);
  }
}
