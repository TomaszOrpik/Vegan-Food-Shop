import { AuthService } from '../../../shared/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { TrackUserService } from 'src/app/shared/services/track-user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private auth: AuthService, private trackUser: TrackUserService) {
  }

  login() {
    localStorage.setItem('isLogging', 'true');
    this.auth.login();
  }
}
