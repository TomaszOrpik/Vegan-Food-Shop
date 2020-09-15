import { TestBed } from '@angular/core/testing';

import { Lang.ServiceService } from './lang.service';

describe('Lang.ServiceService', () => {
  let service: Lang.ServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Lang.ServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
