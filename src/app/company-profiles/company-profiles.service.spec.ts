import { TestBed, inject } from '@angular/core/testing';

import { CompanyProfilesService } from './company-profiles.service';

describe('CompanyProfilesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CompanyProfilesService]
    });
  });

  it('should be created', inject([CompanyProfilesService], (service: CompanyProfilesService) => {
    expect(service).toBeTruthy();
  }));
});
