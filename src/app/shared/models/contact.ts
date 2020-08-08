import { formatDate } from '@angular/common';


export class Contact {
    public datePlaced: string;
    public mail: string;
    public subject: string;
    public body: string;

    constructor(mail: string, subject: string, body: string) {
        this.datePlaced = formatDate(new Date(), 'yyyy/MM/dd hh:mm', 'en');
        this.mail = mail;
        this.subject = subject;
        this.body = body;
    }
}

