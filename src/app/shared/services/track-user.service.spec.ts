import { TestBed, inject } from '@angular/core/testing';

import { TrackUserService } from 'shared/services/track-user.service';

describe('TrackUserService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TrackUserService]
    });
  });

  it('should be created', inject([TrackUserService], (service: TrackUserService) => {
    expect(service).toBeTruthy();
  }));
});
