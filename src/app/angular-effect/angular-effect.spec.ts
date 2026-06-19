import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AngularEffect } from './angular-effect';

describe('AngularEffect', () => {
  let component: AngularEffect;
  let fixture: ComponentFixture<AngularEffect>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AngularEffect],
    }).compileComponents();

    fixture = TestBed.createComponent(AngularEffect);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
