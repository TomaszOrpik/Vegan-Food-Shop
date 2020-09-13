import { TestBed } from '@angular/core/testing';

import { GenerateAverageDataService } from './generate-average-data.service';

describe('GenerateAverageDataService', () => {
  let service: GenerateAverageDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GenerateAverageDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
