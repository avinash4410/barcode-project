import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleRejectorReportComponent } from './single-rejector-report.component';

describe('SingleRejectorReportComponent', () => {
  let component: SingleRejectorReportComponent;
  let fixture: ComponentFixture<SingleRejectorReportComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SingleRejectorReportComponent]
    });
    fixture = TestBed.createComponent(SingleRejectorReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
