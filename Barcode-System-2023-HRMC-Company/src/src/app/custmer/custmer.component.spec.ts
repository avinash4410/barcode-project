import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustmerComponent } from './custmer.component';

describe('CustmerComponent', () => {
  let component: CustmerComponent;
  let fixture: ComponentFixture<CustmerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CustmerComponent]
    });
    fixture = TestBed.createComponent(CustmerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
