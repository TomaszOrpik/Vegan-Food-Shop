import { AuthService } from '../../../shared/services/auth.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { TrackUserService } from 'src/app/shared/services/track-user.service';
import { LangService } from 'src/app/shared/services/lang.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  subContainer: Subscription;
  subListContainer: Subscription;
  resourceString = ['ZALOGUJ SIĘ'];


  constructor(private auth: AuthService, private lang: LangService) {
  }

  ngOnInit() {
    this.lang.getTranslations(this.resourceString);
  }

  ngOnDestroy() {
    this.lang.unSubAll();
  }

  login() {
    localStorage.setItem('isLogging', 'true');
    this.auth.login();
  }
}
