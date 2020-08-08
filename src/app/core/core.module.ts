import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { BsNavbarComponent } from './components/bs-navbar/bs-navbar.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactComponent } from './components/contact/contact.component';
import { FooterComponent } from './components/footer/footer.component';
import { ContactSuccessComponent } from './components/contact-success/contact-success.component';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([
      { path: 'kontakt/sukces', component: ContactSuccessComponent }
    ])
  ],
  declarations: [
    BsNavbarComponent,
    HomeComponent,
    LoginComponent,
    ContactComponent,
    FooterComponent,
    ContactSuccessComponent,
  ],
  exports: [
    BsNavbarComponent,
    FooterComponent,
    ContactComponent
  ]
})
export class CoreModule { }
