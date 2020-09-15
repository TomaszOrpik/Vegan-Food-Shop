import { Component, OnInit, OnDestroy } from '@angular/core';
import { TrackUserService } from 'src/app/shared/services/track-user.service';
import { LangService } from 'src/app/shared/services/lang.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-contact-success',
  templateUrl: './contact-success.component.html',
  styleUrls: ['./contact-success.component.css']
})
export class ContactSuccessComponent implements OnInit, OnDestroy {

  count = 0;

  subContainer: Subscription;
  subListContainer: Subscription;
  resourceString = ['Wiadomość wysłana!',
  'Twoja wiadomość została przekazana do biura obsługi, w ciągu 24 godzin dostaniesz odpowiedź na podany w formularzu adres e-mail.'];

  constructor(private trackUser: TrackUserService, private lang: LangService) { }

  ngOnInit() {
    this.lang.getTranslations(this.resourceString);
    setInterval(() => this.count = this.increaseCount(this.count), 1000);
    const sessionId = localStorage.getItem('sessionId');
    if (sessionId !== 'Admin')
      this.trackUser.updateDidContacted(sessionId);
  }

  increaseCount(count): number {
    return count + 1;
  }

  ngOnDestroy() {
    this.lang.unSubAll();
    const sessionId = localStorage.getItem('sessionId');
    if (sessionId !== 'Admin')
      this.trackUser.postPage(sessionId, 'Kontakt - Potwierdzenie', this.count);
  }
}
