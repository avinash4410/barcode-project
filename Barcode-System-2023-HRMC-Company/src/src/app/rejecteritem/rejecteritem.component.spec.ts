import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RejecteritemComponent } from './rejecteritem.component';

describe('RejecteritemComponent', () => {
  let component: RejecteritemComponent;
  let fixture: ComponentFixture<RejecteritemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RejecteritemComponent]
    });
    fixture = TestBed.createComponent(RejecteritemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
