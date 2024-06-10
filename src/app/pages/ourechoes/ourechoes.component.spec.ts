import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OurechoesComponent } from './ourechoes.component';

describe('OurechoesComponent', () => {
  let component: OurechoesComponent;
  let fixture: ComponentFixture<OurechoesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OurechoesComponent]
    });
    fixture = TestBed.createComponent(OurechoesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
