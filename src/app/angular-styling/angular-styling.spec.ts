import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AngularStyling } from './angular-styling';

describe('AngularStyling', () => {
  let component: AngularStyling;
  let fixture: ComponentFixture<AngularStyling>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AngularStyling],
    }).compileComponents();

    fixture = TestBed.createComponent(AngularStyling);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
