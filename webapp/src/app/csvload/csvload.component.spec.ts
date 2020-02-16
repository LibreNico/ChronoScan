import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CsvloadComponent } from './csvload.component';

describe('CsvloadComponent', () => {
  let component: CsvloadComponent;
  let fixture: ComponentFixture<CsvloadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CsvloadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CsvloadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
