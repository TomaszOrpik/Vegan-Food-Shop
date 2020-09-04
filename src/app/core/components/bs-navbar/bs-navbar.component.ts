import { ShoppingCart } from '../../../shared/models/shopping-cart';
import { Observable } from 'rxjs/Observable';
import { ShoppingCartService } from '../../../shared/services/shopping-cart.service';
import { AppUser } from '../../../shared/models/app-user';
import { AuthService } from '../../../shared/services/auth.service';
import { Component, OnInit, Input } from '@angular/core';
import { TrackUserService } from 'src/app/shared/services/track-user.service';
import { PageActivityService } from 'src/app/shared/services/page-activity.service';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent implements OnInit {
  appUser: AppUser;
  cart: ShoppingCart;
  quantity = 0;
  isLogged = false;
  userName: string;

  constructor(private auth: AuthService,
              private shoppingCartService: ShoppingCartService,
              private pageActivity: PageActivityService) {
  }

  ngOnInit() {
    this.auth.user$.subscribe(appUser => {
      this.userName = appUser.displayName;
      this.isLogged = true;
    });
    this.cart = this.shoppingCartService.loadCart();
  }

  logout() {
    this.auth.logout();
    location.reload();
  }

  navbarElClicked(elementId: string) { this.pageActivity.ElClicked(elementId); }

}
