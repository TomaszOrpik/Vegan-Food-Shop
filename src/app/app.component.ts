import { UserService } from './shared/services/user.service';
import { Router } from '@angular/router';
import { AuthService } from './shared/services/auth.service';
import { Component } from '@angular/core';
import { TrackUserService } from './shared/services/track-user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent { //must post new session

  constructor(
    private userService: UserService, 
    // private trackUser: TrackUserService, 
    private auth: AuthService, 
    router: Router) {
    auth.user$.subscribe(user => {
      // tslint:disable-next-line: curly
      if (!user) return;

      userService.save(user);

      const returnUrl = localStorage.getItem('returnUrl');
      // tslint:disable-next-line: curly
      if (!returnUrl) return;

      localStorage.removeItem('returnUrl');
      router.navigateByUrl(returnUrl);
    });
  }
}
