import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';

import { ContactService } from '../../../shared/services/contact.service';
import { Contact } from 'src/app/shared/models/contact';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  formMail: string;
  formSubject: string;
  formBody: string;

  mail = new FormControl('', [Validators.required]);
  subject = new FormControl('', [Validators.required]);
  body = new FormControl('', [Validators.required]);

  constructor(private router: Router,
              private contactService: ContactService ) {}

  async sendMessage() {

    const contact = new Contact(
      this.formMail,
      this.formSubject,
      this.formBody
    );

    const result = await this.contactService.sendMessage(contact);
    this.router.navigateByUrl('/kontakt/sukces');
  }
}
