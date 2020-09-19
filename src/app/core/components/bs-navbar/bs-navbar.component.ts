import { ShoppingCart } from '../../../shared/models/shopping-cart';
import { ShoppingCartService } from '../../../shared/services/shopping-cart.service';
import { AppUser } from '../../../shared/models/app-user';
import { AuthService } from '../../../shared/services/auth.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { PageActivityService } from 'src/app/shared/services/page-activity.service';
import { LangService } from 'src/app/shared/services/lang.service';
import { Subscription } from 'rxjs';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent implements OnInit, OnDestroy {
  appUser: AppUser;
  cart: ShoppingCart;
  quantity = 0;
  isLogged = false;
  userName: string;

  langChecked: boolean;
  resourceString: string[] = ['Witaj!', 'SKLEP', 'KONTAKT', 'KOSZYK'];

  navClasses = ['collapse', 'navbar-collapse', 'mobile', 'hidden'];
  isNavClasses = false;

  constructor(private auth: AuthService,
              private shoppingCartService: ShoppingCartService,
              private pageActivity: PageActivityService,
              private langService: LangService) {
  }

  ngOnInit() {
    this.auth.user$.subscribe(appUser => {
      this.userName = appUser.displayName;
      this.isLogged = true;
    });
    this.cart = this.shoppingCartService.loadCart();
    this.langService.getTranslations(this.resourceString);

  }

  ngOnDestroy() {
    this.langService.unSubAll();
  }

  logout() {
    this.auth.logout();
    location.reload();
  }

  onChange() {
    if (this.langChecked) this.langService.changeLang('ENG');
    else this.langService.changeLang('PL');
  }

  showNavbar() {
    this.navClasses.pop();
    if (!this.isNavClasses) this.navClasses.push('visible');
     else this.navClasses.push('hidden');
    this.isNavClasses = !this.isNavClasses;
  }

  navbarElClicked(elementId: string) { this.pageActivity.ElClicked(elementId); }

}
