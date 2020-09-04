import { CategoryService } from '../../../../shared/services/category.service';
import { Component, OnInit, Input } from '@angular/core';
import { PageActivityService } from 'src/app/shared/services/page-activity.service';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.css']
})
export class ProductFilterComponent implements OnInit {
  categories$: string[] = [];

  // tslint:disable-next-line: no-input-rename
  @Input('category') category;

  constructor(private categoryService: CategoryService, private pageActivity: PageActivityService) { }
  ngOnInit() {
    this.categoryService.getAll().subscribe(categories =>
      {
        categories.forEach((category: any) => {
          this.categories$.push(category.name);
        });
    });
  }

  categoryClicked(elementId: string) {
    this.pageActivity.ElClicked(elementId);
  }

}
