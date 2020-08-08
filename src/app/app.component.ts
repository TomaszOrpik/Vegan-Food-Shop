import { UserService } from './shared/services/user.service';
import { Router } from '@angular/router';
import { AuthService } from './shared/services/auth.service';
import { Component } from '@angular/core';
import { TrackUserService } from './shared/services/track-user.service';
import { ShoppingCartService } from './shared/services/shopping-cart.service';
import { AdminAuthGuard } from './admin/services/admin-auth-guard.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  userId: string;

  constructor(
    shoppingCartService: ShoppingCartService,

    private userService: UserService,
    private trackUser: TrackUserService,
    private auth: AuthService,
    private adminAuthGuard: AdminAuthGuard,
    router: Router) {
      //add server link and cors = true also create small API to collect messages in mongoose
    localStorage.getItem('VFSTrack') === 'true' ? localStorage.removeItem('VFSTrack') : this.userId = this.trackUser.initTrackUser();
    auth.user$.subscribe(user => {
      if (!user) return;

      userService.save(user);

      this.adminAuthGuard.canActivate().subscribe((res: boolean) => {
        const isAdmin: boolean = res;
        if (isAdmin) {
          this.userId = 'admin';
          //remove session from track user
        }
      });

      const returnUrl = localStorage.getItem('returnUrl');
      if (!returnUrl) return;

      localStorage.removeItem('returnUrl');
      router.navigateByUrl(returnUrl);

    });
  }
}
