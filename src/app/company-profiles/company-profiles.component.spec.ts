import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyProfilesComponent } from './company-profiles.component';

describe('CompanyProfilesComponent', () => {
  let component: CompanyProfilesComponent;
  let fixture: ComponentFixture<CompanyProfilesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanyProfilesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyProfilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
