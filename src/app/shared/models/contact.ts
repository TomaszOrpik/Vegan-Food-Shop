
export class Contact {
    datePlaced: number;
    mail: string;
    subject: string;
    description: string;

    constructor(mail, subject, description) {
        this.datePlaced = new Date().getTime();
        this.mail = mail;
        this.subject = subject;
        this.description = description;
    }
}
