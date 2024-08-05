import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleInspectorReportComponent } from './single-inspector-report.component';

describe('SingleInspectorReportComponent', () => {
  let component: SingleInspectorReportComponent;
  let fixture: ComponentFixture<SingleInspectorReportComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SingleInspectorReportComponent]
    });
    fixture = TestBed.createComponent(SingleInspectorReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
