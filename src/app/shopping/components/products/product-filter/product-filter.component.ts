import { CategoryService } from '../../../../shared/services/category.service';
import { Component, OnInit, Input } from '@angular/core';

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

  constructor(private categoryService: CategoryService) { }
  //ng nie działa, bo chce promise dostać...  zeby być async
  ngOnInit() {
    this.categoryService.getAll().subscribe(categories =>
      {
        categories.forEach((category: any) => {
          this.categories$.push(category.name);
        });
    });
  }

}
