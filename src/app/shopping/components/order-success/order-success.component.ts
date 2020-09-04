import { Component, OnInit, OnDestroy } from '@angular/core';
import { TrackUserService } from 'src/app/shared/services/track-user.service';

@Component({
  selector: 'app-order-success',
  templateUrl: './order-success.component.html',
  styleUrls: ['./order-success.component.css']
})
export class OrderSuccessComponent implements OnInit, OnDestroy {
  count = 0;

  constructor(private trackUser: TrackUserService) { }

  ngOnInit() {
    setInterval(() => this.count = this.increaseCount(this.count), 1000);
  }

  ngOnDestroy() {
    const sessionId = localStorage.getItem('sessionId');
    if (sessionId !== 'Admin')
      this.trackUser.postPage(sessionId, 'Zamówienie Zakończone', this.count);
  }

  increaseCount(count): number {
    return count + 1;
  }

}
