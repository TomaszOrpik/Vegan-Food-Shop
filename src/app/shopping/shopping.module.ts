import { SharedModule } from './../shared/shared.module';
import { AuthGuard } from '../shared/services/auth-guard.service';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { CheckOutComponent } from './components/check-out/check-out.component';
import { MyOrdersComponent } from './components/my-orders/my-orders.component';
import { OrderSuccessComponent } from './components/order-success/order-success.component';
import { ProductFilterComponent } from './components/products/product-filter/product-filter.component';
import { ProductsComponent } from './components/products/products.component';
import { ShippingFormComponent } from './components/shipping-form/shipping-form.component';
import { ShoppingCartSummaryComponent } from './components/shopping-cart-summary/shopping-cart-summary.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { ProductComponent } from './components/product/product.component';
import { CoreModule } from '../core/core.module';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: 'sklep', component: ProductsComponent },
      { path: 'koszyk', component: ShoppingCartComponent },
      { path: 'kasa', component: CheckOutComponent },
      { path: 'podsumowanie/:id', component: OrderSuccessComponent, canActivate: [AuthGuard] },
      { path: 'produkt/:id', component: ProductComponent },
      { path: 'moje/zamowienia', component: MyOrdersComponent, canActivate: [AuthGuard] }
    ]),
    SharedModule,
    CoreModule
  ],
  exports: [RouterModule],
  declarations: [
    ProductsComponent,
    ShoppingCartComponent,
    CheckOutComponent,
    OrderSuccessComponent,
    MyOrdersComponent,
    ProductFilterComponent,
    ShoppingCartSummaryComponent,
    ShippingFormComponent,
    ProductComponent
  ]
})
export class ShoppingModule { }
