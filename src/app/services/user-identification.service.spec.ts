import { TestBed } from '@angular/core/testing';

import { UserIdentificationService } from './user-identification.service';

describe('UserIdentificationService', () => {
  let service: UserIdentificationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserIdentificationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
