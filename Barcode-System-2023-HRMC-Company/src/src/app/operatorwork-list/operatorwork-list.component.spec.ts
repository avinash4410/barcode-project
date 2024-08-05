import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OperatorworkListComponent } from './operatorwork-list.component';

describe('OperatorworkListComponent', () => {
  let component: OperatorworkListComponent;
  let fixture: ComponentFixture<OperatorworkListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OperatorworkListComponent]
    });
    fixture = TestBed.createComponent(OperatorworkListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
