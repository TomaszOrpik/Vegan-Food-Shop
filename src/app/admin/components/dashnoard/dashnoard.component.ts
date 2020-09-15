import { Component, OnInit, OnDestroy } from '@angular/core';
import { LangService } from 'src/app/shared/services/lang.service';
import { Subscription } from 'rxjs';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'dashboard',
  templateUrl: './dashnoard.component.html',
  styleUrls: ['./dashnoard.component.css']
})
export class DashnoardComponent implements OnInit, OnDestroy {

  constructor(private lang: LangService) { }

  container: Subscription;
  listContainer: Subscription;

  resourceString = ['Sprawdź wiadomości', 'Zobacz kupione towary', 'Dodaj towar',
                    'Edytuj tłumaczenie', 'Dane globalne', 'Dane użytkowników'];

  ngOnInit(): void {
    this.container = this.lang.getLang().valueChanges().subscribe((lang: { LANG: string }) => {
      this.listContainer = this.lang.getLangList().valueChanges().subscribe((list: {eng: string, pl: string}[]) => {
        if (lang.LANG === 'PL')
          list.forEach((el: {eng: string, pl: string}) => {
            for (let i = 0; i < this.resourceString.length; i++)
              if (this.resourceString[i] === el.eng) this.resourceString[i] = el.pl;
          });
        if (lang.LANG === 'ENG')
          list.forEach((el: {eng: string, pl: string}) => {
            for (let i = 0; i < this.resourceString.length; i++)
              if (this.resourceString[i] === el.pl) this.resourceString[i] = el.eng;
          });
      });
    });
  }

  ngOnDestroy() {
    this.lang.unSubAll();
  }

}
