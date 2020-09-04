import { Component, OnInit, OnDestroy } from '@angular/core';
import { TrackUserService } from 'src/app/shared/services/track-user.service';

@Component({
  selector: 'app-contact-success',
  templateUrl: './contact-success.component.html',
  styleUrls: ['./contact-success.component.css']
})
export class ContactSuccessComponent implements OnInit, OnDestroy {

  count = 0;

  constructor(private trackUser: TrackUserService) { }

  ngOnInit() {
    setInterval(() => this.count = this.increaseCount(this.count), 1000);
    const sessionId = localStorage.getItem('sessionId');
    if (sessionId !== 'Admin')
      this.trackUser.updateDidContacted(sessionId);
  }

  increaseCount(count): number {
    return count + 1;
  }

  ngOnDestroy() {
    const sessionId = localStorage.getItem('sessionId');
    if (sessionId !== 'Admin')
      this.trackUser.postPage(sessionId, 'Kontakt - Potwierdzenie', this.count);
  }
}
