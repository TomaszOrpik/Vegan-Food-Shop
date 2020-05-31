import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable()
export class ContactService {

  constructor(private db: AngularFireDatabase) { }

  async sendMessage(contact) {
    // tslint:disable-next-line: prefer-const
    let result = await this.db.list('/messages').push(contact);
    return result;
  }
}
