import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ContactService } from 'shared/services/contact.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  contact = {};

  constructor(private router: Router,
    private contactService: ContactService
    ) {}

  async sendMessage() {

    // tslint:disable-next-line: prefer-const
    let now = new Date();
    // tslint:disable-next-line: prefer-const
    let detailContact = {
      date: `${now.getDay()}/${now.getMonth()}/${now.getFullYear()}`,
      message: this.contact
    };
    // tslint:disable-next-line: prefer-const
    let result = await this.contactService.sendMessage(detailContact);
    this.router.navigateByUrl('/kontakt/sukces');
  }
}
