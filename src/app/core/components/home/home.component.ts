import { Component, OnInit, OnDestroy } from '@angular/core';
import { TrackUserService } from 'src/app/shared/services/track-user.service';
import { PageActivityService } from 'src/app/shared/services/page-activity.service';
import { Subscription } from 'rxjs';
import { LangService } from 'src/app/shared/services/lang.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  count = 0;

  subContainer: Subscription;
  subListContainer: Subscription;
  resourceString = ['Jedz zdrowo i smacznie', 'Zacznij zakupy już teraz!',
                    'ROZPOCZNIJ', 'Zdrowe warzywa!', 'Codziennie dbamy o to, by dostarczyć wam dzienną porcję świeżych warzyw, by każdy nasz klient mógł rozpocząć dzień zdrowo i ze smakiem.',
                    'Świeże pieczywo!', 'Codziennie rano dostajemy partię wypieczonych ręcznie pieczyw, by każdy klient mógł być pewien, że nasze produkty są zawsze najwyższej jakości.',
                    'Produkty mleczne!', 'Dbając o nasz asortyment, mamy również w ofercie naturalne produkty mleczne, czyli ręcznie wyrabiane sery, śmietany i oczywiście pyszne mleko bez dodatków chemicznych.',
                    'Zacznij zakupy już teraz!', 'WEJDŹ'];

  constructor(private trackUser: TrackUserService,
              private pageActivity: PageActivityService,
              private lang: LangService) { }

  ngOnInit() {
    this.lang.getTranslations(this.resourceString);
    setInterval(() => this.count = this.increaseCount(this.count), 1000);
  }

  increaseCount(count): number {
    return count + 1;
  }

  ngOnDestroy() {
    this.lang.unSubAll();
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
