import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpreterReportComponent } from './opreter-report.component';

describe('OpreterReportComponent', () => {
  let component: OpreterReportComponent;
  let fixture: ComponentFixture<OpreterReportComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OpreterReportComponent]
    });
    fixture = TestBed.createComponent(OpreterReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
