import { TestBed } from '@angular/core/testing';

import { PageActivityService } from './page-activity.service';

describe('PageActivityService', () => {
  let service: PageActivityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PageActivityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
