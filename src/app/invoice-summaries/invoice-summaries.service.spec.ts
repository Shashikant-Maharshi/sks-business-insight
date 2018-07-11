import { TestBed, inject } from '@angular/core/testing';

import { InvoiceSummariesService } from './invoice-summaries.service';

describe('InvoiceSummariesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InvoiceSummariesService]
    });
  });

  it('should be created', inject([InvoiceSummariesService], (service: InvoiceSummariesService) => {
    expect(service).toBeTruthy();
  }));
});
