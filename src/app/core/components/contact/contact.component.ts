import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';

import { ContactService } from '../../../shared/services/contact.service';
import { Contact } from 'src/app/shared/models/contact';
import { TrackUserService } from 'src/app/shared/services/track-user.service';
import { PageActivityService } from 'src/app/shared/services/page-activity.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit, OnDestroy {

  count = 0;

  formMail: string;
  formSubject: string;
  formBody: string;

  mail = new FormControl('', [Validators.required]);
  subject = new FormControl('', [Validators.required]);
  body = new FormControl('', [Validators.required]);

  constructor(private router: Router,
              private contactService: ContactService,
              private trackUser: TrackUserService,
              private pageActivity: PageActivityService ) {  }

  ngOnInit() {
    setInterval(() => this.count = this.increaseCount(this.count), 1000);
  }

  ngOnDestroy() {
    const sessionId = localStorage.getItem('sessionId');
    if (sessionId !== 'Admin')
      this.trackUser.postPage(sessionId, 'Produkty + Kontakt', this.count);
  }

  increaseCount(count): number {
    return count + 1;
  }

  async sendMessage(elementId: string) {

    const contact = new Contact(
      this.formMail,
      this.formSubject,
      this.formBody
    );

    this.pageActivity.ElClicked(elementId);

    const result = await this.contactService.sendMessage(contact);
    this.router.navigateByUrl('/kontakt/sukces');
  }

  collectClick(elementId: string) {
    this.pageActivity.collectClick(elementId);
  }
}
