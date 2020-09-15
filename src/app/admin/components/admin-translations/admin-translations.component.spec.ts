import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminTranslationsComponent } from './admin-translations.component';

describe('AdminTranslationsComponent', () => {
  let component: AdminTranslationsComponent;
  let fixture: ComponentFixture<AdminTranslationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminTranslationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminTranslationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
