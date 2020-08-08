import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Contact } from '../models/contact';

@Injectable()
export class ContactService {

  constructor(private db: AngularFireDatabase) { }

  async sendMessage(contact: Contact) {
    const result = await this.db.list('/messages').push({
      date: contact.datePlaced,
      mail: contact.mail,
      subject: contact.subject,
      body: contact.body
    });
    return result;
  }

  getMessages() {
    return this.db.list('/messages').valueChanges();
  }
}
