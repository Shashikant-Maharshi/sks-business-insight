import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceSummariesComponent } from './invoice-summaries.component';

describe('InvoiceSummariesComponent', () => {
  let component: InvoiceSummariesComponent;
  let fixture: ComponentFixture<InvoiceSummariesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvoiceSummariesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvoiceSummariesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
