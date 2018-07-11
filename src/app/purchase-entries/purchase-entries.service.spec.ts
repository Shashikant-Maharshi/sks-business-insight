import { TestBed, inject } from '@angular/core/testing';

import { PurchaseEntriesService } from './purchase-entries.service';

describe('PurchaseEntriesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PurchaseEntriesService]
    });
  });

  it('should be created', inject([PurchaseEntriesService], (service: PurchaseEntriesService) => {
    expect(service).toBeTruthy();
  }));
});
