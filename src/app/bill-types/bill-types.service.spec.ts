import { TestBed, inject } from '@angular/core/testing';

import { BillTypesService } from './bill-types.service';

describe('BillTypesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BillTypesService]
    });
  });

  it('should be created', inject([BillTypesService], (service: BillTypesService) => {
    expect(service).toBeTruthy();
  }));
});
