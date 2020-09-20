import { Injectable } from '@angular/core';
import { Observable, of, Subscription } from 'rxjs';
import { AngularFireDatabase } from 'angularfire2/database';
import { Translation } from '../models/translation';

@Injectable({
  providedIn: 'root'
})
export class LangService {

  constructor(private db: AngularFireDatabase) { }

  langKey: string;
  container: Subscription;
  listContainer: Subscription;

  getTranslations(resourceString: string[]) {
    this.container = this.getLang().valueChanges().subscribe((lang: { LANG: string }) => {
      this.listContainer = this.getLangList().valueChanges().subscribe((list: {eng: string, pl: string}[]) => {
        if (lang.LANG === 'PL')
          list.forEach((el: {eng: string, pl: string}) => {
            for (let i = 0; i < resourceString.length; i++)
              if (resourceString[i] === el.eng) resourceString[i] = el.pl;
          });
        if (lang.LANG === 'ENG')
          list.forEach((el: {eng: string, pl: string}) => {
            for (let i = 0; i < resourceString.length; i++)
              if (resourceString[i] === el.pl) resourceString[i] = el.eng;
          });
      });
    });
  }

  unSubAll() {
    this.container.unsubscribe();
    this.listContainer.unsubscribe();
  }

  addLangUser(): string {
    const lang = { LANG: 'PL'};
    const newLang = this.db.list('/Language').push(lang);
    this.langKey = newLang.key;
    return newLang.key;
  }

  changeLang(lang: string) {
    const newLang = { LANG: lang };
    this.db.list('/Language').update(this.langKey, newLang);
    // this.db.object('/Language').set(lang);
  }

  getLang() {
    return this.db.object('/Language/' + this.langKey);
   // return this.db.object('/Language');
  }

  getLangList() {
    return this.db.list('/translations');
  }

  addLangToList(translation: Translation) {
    this.db.list('/translations').push(translation);
  }

  updateLang(key: string, translation: Translation) {
    this.db.list('/translations').update(key, translation);
  }
}
