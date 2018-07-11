import { TestBed, inject } from '@angular/core/testing';

import { BankAccountsService } from './bank-accounts.service';

describe('BankAccountsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BankAccountsService]
    });
  });

  it('should be created', inject([BankAccountsService], (service: BankAccountsService) => {
    expect(service).toBeTruthy();
  }));
});
