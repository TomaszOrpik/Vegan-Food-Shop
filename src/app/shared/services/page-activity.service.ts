import { Injectable } from '@angular/core';
import { TrackUserService } from './track-user.service';

@Injectable({
  providedIn: 'root'
})
export class PageActivityService {

  constructor(private trackUser: TrackUserService) { }

  ElClicked(elementId: string) {
    const element = document.getElementById(elementId);
    const offSetLeft = element.offsetLeft + (element.offsetWidth / 2);
    const offSetTop = element.offsetTop + (element.offsetHeight / 2);
    const sessionId = localStorage.getItem('sessionId');
    if (sessionId !== 'Admin')
      this.trackUser.postSessionScrap(
        sessionId,
        offSetLeft,
        offSetTop,
        elementId,
        'None',
        'None'
      );
  }

  collectClick(elementId: string) {
    const element = document.getElementById(elementId) as HTMLInputElement;
    const InputKey = element.value;
    const offSetLeft = element.offsetLeft + (element.offsetWidth / 2);
    const offSetTop = element.offsetTop + (element.offsetHeight / 2);
    const sessionId = localStorage.getItem('sessionId');
    if (sessionId !== 'Admin')
      this.trackUser.postSessionScrap(
        sessionId,
        offSetLeft,
        offSetTop,
        'None',
        elementId,
        InputKey
      );
  }

}
