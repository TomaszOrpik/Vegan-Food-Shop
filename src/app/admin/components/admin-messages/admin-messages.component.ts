import { Component, OnInit, OnDestroy } from '@angular/core';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { Observable } from 'rxjs/Observable';
import { ContactService } from 'src/app/shared/services/contact.service';
import { Subscription } from 'rxjs';
import { LangService } from 'src/app/shared/services/lang.service';

@Component({
  selector: 'app-admin-messages',
  templateUrl: './admin-messages.component.html',
  styleUrls: ['./admin-messages.component.css']
})
export class AdminMessagesComponent implements OnInit, OnDestroy {
  messages$: Observable<any[]>;

  subContainer: Subscription;
  subListContainer: Subscription;
  resourceString = ['Wiadomości', 'Data', 'E-mail', 'Temat', 'Opis', 'Wyślij Wiadomość'];

  constructor(private contactService: ContactService, private lang: LangService) {
    this.messages$ = this.contactService.getMessages() as Observable<any[]>;
  }

  ngOnInit() {
    this.lang.getTranslations(this.resourceString);
  }

  ngOnDestroy() {
    this.lang.unSubAll();
  }

  shortSentence(text: string) { return `${text.substr(0, 15)}...`; }

}
