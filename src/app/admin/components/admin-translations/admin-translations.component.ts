import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { LangService } from 'src/app/shared/services/lang.service';
import { Translation } from 'src/app/shared/models/translation';

@Component({
  selector: 'app-admin-translations',
  templateUrl: './admin-translations.component.html',
  styleUrls: ['./admin-translations.component.css']
})
export class AdminTranslationsComponent implements OnInit, OnDestroy {

  formNewEnglish: string;
  formNewPolish: string;

  newEnglish = new FormControl('', [Validators.required]);
  newPolish = new FormControl('', [Validators.required]);

  formEditEnglish: string;
  formEditPolish: string;
  currentKey: string;

  editEnglish = new FormControl('', [Validators.required]);
  editPolish = new FormControl('', [Validators.required]);

  translationsList: {key: string, translation: Translation}[] = [];

  resourceString = ['Angielski', 'Angielska wersja', 'Pole Puste!', 'Polski', 'Polska wersja', 'Zapisz', 'Zmień'];

  constructor(private lang: LangService) { }

  ngOnInit(): void {
    this.lang.getLangList().snapshotChanges().subscribe(keyList => {
      this.lang.getLangList().valueChanges().subscribe((list: Translation[]) => {
        const newTranslation: {key: string, translation: Translation}[] = [];
        for (let i = 0; i < keyList.length; i++)
          newTranslation.push({ key: (keyList[i].key as string), translation: list[i] });
        this.translationsList = newTranslation;
      });
    });
    this.lang.getTranslations(this.resourceString);
  }

  ngOnDestroy() {
    this.lang.unSubAll();
  }

  shortSentence(text: string) { return `${text.substr(0, 52)}...`; }

  saveNew() {
    const item = new Translation();
    item.eng = this.newEnglish.value;
    item.pl = this.newPolish.value;

    this.lang.addLangToList(item);
  }

  update() {
    const updateItem = new Translation();
    updateItem.eng = this.editEnglish.value;
    updateItem.pl = this.editPolish.value;
    this.lang.updateLang(this.currentKey, updateItem);
  }

  readyForEdit(translationItem: {key: string, translation: Translation}) {
    this.formEditEnglish = translationItem.translation.eng;
    this.formEditPolish = translationItem.translation.pl;
    this.currentKey = translationItem.key;
  }

}
