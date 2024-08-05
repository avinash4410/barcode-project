import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InspectorWorkListComponent } from './inspector-work-list.component';

describe('InspectorWorkListComponent', () => {
  let component: InspectorWorkListComponent;
  let fixture: ComponentFixture<InspectorWorkListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InspectorWorkListComponent]
    });
    fixture = TestBed.createComponent(InspectorWorkListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
