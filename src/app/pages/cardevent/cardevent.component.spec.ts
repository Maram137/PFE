import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardeventComponent } from './cardevent.component';

describe('CardeventComponent', () => {
  let component: CardeventComponent;
  let fixture: ComponentFixture<CardeventComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CardeventComponent]
    });
    fixture = TestBed.createComponent(CardeventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
