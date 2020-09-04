import { UserService } from './shared/services/user.service';
import { Router } from '@angular/router';
import { AuthService } from './shared/services/auth.service';
import { Component, HostListener } from '@angular/core';
import { TrackUserService } from './shared/services/track-user.service';
import { ShoppingCartService } from './shared/services/shopping-cart.service';
import { AdminAuthGuard } from './admin/services/admin-auth-guard.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  sessionId: string;
  currentDate = Date.now();
  isLogging = false;
  showDashboard = false;

  constructor(
    shoppingCartService: ShoppingCartService,
    private adminAuth: AdminAuthGuard,

    private userService: UserService,
    private trackUser: TrackUserService,
    private auth: AuthService,
    private adminAuthGuard: AdminAuthGuard,
    router: Router) {
    if (localStorage.getItem('isLogging') === 'true')
      this.isLogging = true;

    if (this.isLogging === false)
        this.trackUser.initTrackUser();


    setTimeout(() => {
        if (this.isLogging) {
          this.sessionId = localStorage.getItem('sessionId');
          localStorage.setItem('isLogging', 'false');
          this.isLogging = false;
        } else {
          this.sessionId = this.trackUser.sessionId;
          localStorage.setItem('sessionId', this.trackUser.sessionId);
        }
    }, 2000);

    setTimeout(() => {
      const ssId = localStorage.getItem('sessionId');
      if (ssId === 'Admin')
        this.showDashboard = true;
    }, 3500);

    auth.user$.subscribe(user => {
      if (!user) return;

      userService.save(user);
      const uid = user.uid;
      userService.get(uid).valueChanges().subscribe((newUser: typeof user) => {
        if (newUser.isAdmin) {
          const sessionIdDub = localStorage.getItem('sessionId');
          localStorage.setItem('sessionId', 'Admin');
          this.trackUser.removeSession(sessionIdDub);
        } else this.trackUser.updateDidLogged(sessionId);
      });
      this.sessionId = localStorage.getItem('sessionId');
      const sessionId = localStorage.getItem('sessionId');

      console.log(this.sessionId);

      const returnUrl = localStorage.getItem('returnUrl');
      if (!returnUrl) return;

      localStorage.removeItem('returnUrl');
      router.navigateByUrl(returnUrl);
    });
  }

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(e: MouseEvent) {
    const date = Date.now();
    if (date > this.currentDate + 1000) {
      this.currentDate = date;
      const sessionId = localStorage.getItem('sessionId');
      if (sessionId !== 'Admin')
        this.trackUser.postSessionScrap(
          this.sessionId,
          e.pageX,
          e.pageY,
          'None',
          'None',
          'None'
        );
    }
  }
}
