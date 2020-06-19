import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ContactService } from '../../../shared/services/contact.service';
import { Contact } from 'src/app/shared/models/contact';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  contact: Contact;

  constructor(private router: Router,
    // tslint:disable-next-line: align
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
