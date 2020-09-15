import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';

import { ContactService } from '../../../shared/services/contact.service';
import { Contact } from 'src/app/shared/models/contact';
import { TrackUserService } from 'src/app/shared/services/track-user.service';
import { PageActivityService } from 'src/app/shared/services/page-activity.service';
import { Subscription } from 'rxjs';
import { LangService } from 'src/app/shared/services/lang.service';

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

  resourceString: string[] = ['Kontakt', 'E-mail', 'Adres e-mail wymagany!', 'Temat', 'Temat wymagany!', 'Treść', 'Treść maila wymagana!', 'Wyślij',
  'imie@poczta.com', 'Pytanie', 'Zwracam się z pytaniem...'];
  subcontainer: Subscription;
  subListContainer: Subscription;

  constructor(private router: Router,
              private contactService: ContactService,
              private trackUser: TrackUserService,
              private pageActivity: PageActivityService,
              private lang: LangService ) {  }

  ngOnInit() {
    this.lang.getTranslations(this.resourceString);
    setInterval(() => this.count = this.increaseCount(this.count), 1000);
  }

  ngOnDestroy() {
    this.lang.unSubAll();
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
