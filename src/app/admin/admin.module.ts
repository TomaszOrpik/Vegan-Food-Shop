import { AdminAuthGuard } from './services/admin-auth-guard.service';
import { RouterModule } from '@angular/router';
import { SharedModule } from './../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { AdminProductsComponent } from './components/admin-products/admin-products.component';
import { AdminOrdersComponent } from './components/admin-orders/admin-orders.component';
import { NgModule, isDevMode } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthGuard } from './../shared/services/auth-guard.service';
import { DashnoardComponent } from './components/dashnoard/dashnoard.component';
import { AdminMessagesComponent } from './components/admin-messages/admin-messages.component';
import { PageActivityComponent } from './components/page-activity/page-activity.component';
import { UsersListComponent } from './components/users-list/users-list.component';


@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([
      {
        path: 'admin/sklep/nowy',
        component: ProductFormComponent,
       canActivate: [
          AuthGuard,
          // AdminAuthGuard
        ]
      },
      {
        path: 'admin/sklep/:id',
        component: ProductFormComponent,
        canActivate: [
          AuthGuard,
          // AdminAuthGuard
        ]
      },
      {
        path: 'admin/sklep',
        component: AdminProductsComponent,
        canActivate: [
          AuthGuard,
          // AdminAuthGuard
        ]
      },
      {
        path: 'admin/zamowienia',
        component: AdminOrdersComponent,
        canActivate: [
          AuthGuard,
          // AdminAuthGuard
        ]
      },
      {
        path: 'admin/wiadomosci',
        component: AdminMessagesComponent,
        canActivate: [
          AuthGuard,
          // AdminAuthGuard
        ]
      },
      {
        path: 'admin/globalne',
        component: PageActivityComponent,
        canActivate: [
          AuthGuard,
          // AdminAuthGuard
        ]
      },
      {
        path: 'admin/uzytkownicy',
        component: UsersListComponent,
        canActivate: [
          AuthGuard,
          // AdminAuthGuard
        ]
      }
    ])
  ],
  declarations: [
    ProductFormComponent,
    AdminProductsComponent,
    AdminOrdersComponent,
    DashnoardComponent,
    AdminMessagesComponent,
    PageActivityComponent,
    UsersListComponent,
  ],
  exports: [
    DashnoardComponent
  ]
})
export class AdminModule { }
