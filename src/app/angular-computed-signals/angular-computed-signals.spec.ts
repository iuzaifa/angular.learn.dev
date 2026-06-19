import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AngularComputedSignals } from './angular-computed-signals';

describe('AngularComputedSignals', () => {
  let component: AngularComputedSignals;
  let fixture: ComponentFixture<AngularComputedSignals>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AngularComputedSignals],
    }).compileComponents();

    fixture = TestBed.createComponent(AngularComputedSignals);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
