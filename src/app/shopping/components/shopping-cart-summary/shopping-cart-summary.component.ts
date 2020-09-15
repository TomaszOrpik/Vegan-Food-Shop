import { ShoppingCart } from '../../../shared/models/shopping-cart';
import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { LangService } from 'src/app/shared/services/lang.service';
import { Subscription } from 'rxjs';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'shopping-cart-summary',
  templateUrl: './shopping-cart-summary.component.html',
  styleUrls: ['./shopping-cart-summary.component.css']
})
export class ShoppingCartSummaryComponent implements OnInit, OnDestroy {

  @Input() cart: ShoppingCart;

  resourceString = ['Zamówienie', 'Masz', 'produktów w koszyku.', 'Łącznie'];

  constructor(private lang: LangService) {}

  ngOnInit() {
    setTimeout(() => {
      this.cart.items.forEach(item => this.resourceString.push(item.title));
      this.lang.getTranslations(this.resourceString);
    }, 100);
  }

  ngOnDestroy() {
    this.lang.unSubAll();
  }
}
