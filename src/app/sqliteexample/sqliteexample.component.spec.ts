import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SqliteexampleComponent } from './sqliteexample.component';

describe('SqliteexampleComponent', () => {
  let component: SqliteexampleComponent;
  let fixture: ComponentFixture<SqliteexampleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SqliteexampleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SqliteexampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
