import { ShoppingCartService } from '../../../shared/services/shopping-cart.service';
import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { ShoppingCart } from 'src/app/shared/models/shopping-cart';
import { TrackUserService } from 'src/app/shared/services/track-user.service';
import { Subscription } from 'rxjs';
import { LangService } from 'src/app/shared/services/lang.service';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit, OnDestroy {
  count = 0;
  cart: ShoppingCart;

  subContainer: Subscription;
  subListContainer: Subscription;
  resourceString = ['Dostawa'];

  notMobile = true;

  constructor(private cartService: ShoppingCartService,
              private trackUser: TrackUserService,
              private lang: LangService) {
    if (localStorage.getItem('VFSCart') !== null && (localStorage.getItem('VFSCart') as any).length !== 0) {
      this.cart = this.cartService.loadCart();
      document.getElementById('cartCounter').innerHTML = this.cart.totalItemsCount().toString();
    }
    else this.cart = new ShoppingCart();
  }

  ngOnInit() {
    if (window.outerWidth < 600) this.notMobile = false;
    this.lang.getTranslations(this.resourceString);
    setInterval(() => this.count = this.increaseCount(this.count), 1000);
  }

  ngOnDestroy() {
    this.lang.unSubAll();
    const sessionId = localStorage.getItem('sessionId');
    if (sessionId !== 'Admin')
      this.trackUser.postPage(sessionId, 'Kasa', this.count);
  }

  increaseCount(count): number {
    return count + 1;
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    if (window.outerWidth < 770) this.notMobile = false;
    else this.notMobile = true;
  }

}
