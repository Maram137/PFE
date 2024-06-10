import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeecComponent } from './geec.component';

describe('GeecComponent', () => {
  let component: GeecComponent;
  let fixture: ComponentFixture<GeecComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GeecComponent]
    });
    fixture = TestBed.createComponent(GeecComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
