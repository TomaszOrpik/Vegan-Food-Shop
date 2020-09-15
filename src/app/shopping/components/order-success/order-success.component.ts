import { Component, OnInit, OnDestroy } from '@angular/core';
import { TrackUserService } from 'src/app/shared/services/track-user.service';
import { LangService } from 'src/app/shared/services/lang.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-order-success',
  templateUrl: './order-success.component.html',
  styleUrls: ['./order-success.component.css']
})
export class OrderSuccessComponent implements OnInit, OnDestroy {
  count = 0;

  subContainer: Subscription;
  subListContainer: Subscription;
  resourceString = ['Dziękujemy!', 'Otrzymaliśmy twoje zamówienie i zrealizujemy je w ciąglu najbliższych 24 godzin!'];

  constructor(private trackUser: TrackUserService, private lang: LangService) { }

  ngOnInit() {
    this.lang.getTranslations(this.resourceString);
    setInterval(() => this.count = this.increaseCount(this.count), 1000);
  }

  ngOnDestroy() {
    this.lang.unSubAll();
    const sessionId = localStorage.getItem('sessionId');
    if (sessionId !== 'Admin')
      this.trackUser.postPage(sessionId, 'Zamówienie Zakończone', this.count);
  }

  increaseCount(count): number {
    return count + 1;
  }

}
