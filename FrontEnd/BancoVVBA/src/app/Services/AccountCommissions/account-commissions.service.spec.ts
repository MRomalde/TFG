import { TestBed } from '@angular/core/testing';

import { AccountCommissionsService } from './account-commissions.service';

describe('AccountCommissionsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AccountCommissionsService = TestBed.get(AccountCommissionsService);
    expect(service).toBeTruthy();
  });
});
