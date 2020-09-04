import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  sessionId: string;

  constructor() {
    this.sessionId = 'Generating...';
    setInterval(() => {
      this.sessionId = localStorage.getItem('sessionId');
    }, 1000);
  }

}
