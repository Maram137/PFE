import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeveloperdaysComponent } from './developerdays.component';

describe('DeveloperdaysComponent', () => {
  let component: DeveloperdaysComponent;
  let fixture: ComponentFixture<DeveloperdaysComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeveloperdaysComponent]
    });
    fixture = TestBed.createComponent(DeveloperdaysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
