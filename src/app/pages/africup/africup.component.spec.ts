import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AfricupComponent } from './africup.component';

describe('AfricupComponent', () => {
  let component: AfricupComponent;
  let fixture: ComponentFixture<AfricupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AfricupComponent]
    });
    fixture = TestBed.createComponent(AfricupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
