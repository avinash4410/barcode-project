import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RejectorWorkListComponent } from './rejector-work-list.component';

describe('RejectorWorkListComponent', () => {
  let component: RejectorWorkListComponent;
  let fixture: ComponentFixture<RejectorWorkListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RejectorWorkListComponent]
    });
    fixture = TestBed.createComponent(RejectorWorkListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
