import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExhibitComponent } from './exhibit.component';

describe('ExhibitComponent', () => {
  let component: ExhibitComponent;
  let fixture: ComponentFixture<ExhibitComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExhibitComponent]
    });
    fixture = TestBed.createComponent(ExhibitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
