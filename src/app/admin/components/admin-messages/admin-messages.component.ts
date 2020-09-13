import { Component, OnInit } from '@angular/core';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { Observable } from 'rxjs/Observable';
import { ContactService } from 'src/app/shared/services/contact.service';
import { Contact } from 'src/app/shared/models/contact';

@Component({
  selector: 'app-admin-messages',
  templateUrl: './admin-messages.component.html',
  styleUrls: ['./admin-messages.component.css']
})
export class AdminMessagesComponent {
  messages$: Observable<any[]>;

  constructor(private contactService: ContactService) {
    this.messages$ = this.contactService.getMessages() as Observable<any[]>;
  }

  shortSentence(text: string) { return `${text.substr(0, 15)}...`; }

}
