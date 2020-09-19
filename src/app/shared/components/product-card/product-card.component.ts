import { ShoppingCart } from '../../models/shopping-cart';
import { ShoppingCartService } from '../../services/shopping-cart.service';
import { Product } from '../../models/product';
import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { TrackUserService } from '../../services/track-user.service';
import { PageActivityService } from '../../services/page-activity.service';
import { stringify } from 'querystring';
import { LangService } from '../../services/lang.service';
import { Subscription } from 'rxjs';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit, OnDestroy {

  @Input() product: Product;
  @Input() showActions = true;
  @Input() cart: ShoppingCart;

  resourceString = ['Dodaj do koszyka', ''];
  subContainer: Subscription;
  subListContainer: Subscription;

  constructor(private router: Router,
              private cartService: ShoppingCartService,
              private trackUser: TrackUserService,
              private pageActivity: PageActivityService,
              private lang: LangService) { }
  ngOnInit() {
    setTimeout(() => {
      this.resourceString[1] = this.product.title;
      this.subContainer = this.lang.getLang().valueChanges().subscribe((lang: { LANG: string }) => {
          this.subListContainer = this.lang.getLangList().valueChanges().subscribe((list: {eng: string, pl: string}[]) => {
            if (lang.LANG === 'PL')
              list.forEach((el: {eng: string, pl: string}) => {
                for (let i = 0; i < this.resourceString.length; i++)
                  if (this.resourceString[i] === el.eng) this.resourceString[i] = el.pl;
              });
            if (lang.LANG === 'ENG')
              list.forEach((el: {eng: string, pl: string}) => {
                for (let i = 0; i < this.resourceString.length; i++)
                  if (this.resourceString[i] === el.pl) this.resourceString[i] = el.eng;
              });
          });
        });
    }, 100);
  }

  ngOnDestroy() {
    if (this.subContainer !== undefined) this.subContainer.unsubscribe();
    if (this.subListContainer !== undefined) this.subListContainer.unsubscribe();
  }

  addToCart(elementId: string) {
    this.pageActivity.ElClicked(elementId);
    this.cart.addItem(this.product);
    document.getElementById('cartCounter').innerHTML = this.cart.totalItemsCount().toString();
    const sessionId = localStorage.getItem('sessionId');
    if (sessionId !== 'Admin')
      this.trackUser.postCartItems(sessionId, this.product.title, 'Dodaj');
  }

  redirect(elementId: string) {
    this.pageActivity.ElClicked(elementId);
    this.router.navigateByUrl('produkt/' + this.product.id);
  }
}
