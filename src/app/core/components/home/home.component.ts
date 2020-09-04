import { Component, OnInit, OnDestroy } from '@angular/core';
import { TrackUserService } from 'src/app/shared/services/track-user.service';
import { PageActivityService } from 'src/app/shared/services/page-activity.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  count = 0;

  constructor(private trackUser: TrackUserService, private pageActivity: PageActivityService) { }

  ngOnInit() {
    setInterval(() => this.count = this.increaseCount(this.count), 1000);
  }

  increaseCount(count): number {
    return count + 1;
  }

  ngOnDestroy() {
    const sessionId = localStorage.getItem('sessionId');
    if (sessionId !== 'Admin')
      this.trackUser.postPage(sessionId, 'Strona Główna', this.count);
  }

  scrollToTop() {
    window.scroll(0, 0);
  }

  ElClicked(elementId: string) {
    this.pageActivity.ElClicked(elementId);
  }

}
