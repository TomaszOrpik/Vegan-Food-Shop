import { TestBed } from '@angular/core/testing';

import { GetUsersDataService } from './get-users-data.service';

describe('GetUsersDataService', () => {
  let service: GetUsersDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetUsersDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
