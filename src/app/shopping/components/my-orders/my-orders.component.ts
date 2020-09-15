import { AuthService } from '../../../shared/services/auth.service';
import { OrderService } from '../../../shared/services/order.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { TrackUserService } from 'src/app/shared/services/track-user.service';
import { Subscription } from 'rxjs';
import { LangService } from 'src/app/shared/services/lang.service';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit, OnDestroy {
  count = 0;
  orders$;

  subContainer: Subscription;
  subListContainer: Subscription;
  resourceString = ['Klient', 'Data', 'Wyświetl'];

  constructor(
    authService: AuthService,
    orderService: OrderService,
    private trackUser: TrackUserService,
    private lang: LangService) {

    this.orders$ = authService.user$
      .switchMap(u => orderService.getOrdersByUser(u.uid).valueChanges());
  }

  ngOnInit() {
    this.lang.getTranslations(this.resourceString);
    setInterval(() => this.count = this.increaseCount(this.count), 1000);
  }

  ngOnDestroy() {
    this.lang.unSubAll();
    const sessionId = localStorage.getItem('sessionId');
    if (sessionId !== 'Admin')
      this.trackUser.postPage(sessionId, 'Moje Zamówienia', this.count);
  }

  increaseCount(count): number {
    return count + 1;
  }
}
