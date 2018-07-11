import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseEntriesComponent } from './purchase-entries.component';

describe('PurchaseEntriesComponent', () => {
  let component: PurchaseEntriesComponent;
  let fixture: ComponentFixture<PurchaseEntriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PurchaseEntriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchaseEntriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
