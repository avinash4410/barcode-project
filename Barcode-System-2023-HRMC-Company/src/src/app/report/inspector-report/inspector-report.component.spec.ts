import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InspectorReportComponent } from './inspector-report.component';

describe('InspectorReportComponent', () => {
  let component: InspectorReportComponent;
  let fixture: ComponentFixture<InspectorReportComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InspectorReportComponent]
    });
    fixture = TestBed.createComponent(InspectorReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
