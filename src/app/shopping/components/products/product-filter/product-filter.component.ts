import { CategoryService } from '../../../../shared/services/category.service';
import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { PageActivityService } from 'src/app/shared/services/page-activity.service';
import { Subscription } from 'rxjs';
import { LangService } from 'src/app/shared/services/lang.service';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.css']
})
export class ProductFilterComponent implements OnInit, OnDestroy {
  categories$: string[] = [];

  // tslint:disable-next-line: no-input-rename
  @Input('category') category;

  subContainer: Subscription;
  subListContainer: Subscription;
  resourceString = ['Wszystkie Kategorie'];

  constructor(private categoryService: CategoryService,
              private pageActivity: PageActivityService,
              private lang: LangService) { }
  ngOnInit() {
    this.categoryService.getAll().subscribe(categories =>
      {
        categories.forEach((category: any) => {
          this.categories$.push(category.name);
          this.resourceString.push(category.name);
        });
        this.lang.getTranslations(this.resourceString);
    });
  }

  ngOnDestroy() {
    this.lang.unSubAll();
  }

  categoryClicked(elementId: string) {
    this.pageActivity.ElClicked(elementId);
  }

}
