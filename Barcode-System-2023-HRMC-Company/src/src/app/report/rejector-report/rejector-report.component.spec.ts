import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RejectorReportComponent } from './rejector-report.component';

describe('RejectorReportComponent', () => {
  let component: RejectorReportComponent;
  let fixture: ComponentFixture<RejectorReportComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RejectorReportComponent]
    });
    fixture = TestBed.createComponent(RejectorReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
