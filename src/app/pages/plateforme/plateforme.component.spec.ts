import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlateformeComponent } from './plateforme.component';

describe('PlateformeComponent', () => {
  let component: PlateformeComponent;
  let fixture: ComponentFixture<PlateformeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PlateformeComponent]
    });
    fixture = TestBed.createComponent(PlateformeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
