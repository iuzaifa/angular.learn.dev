import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AngularSignals } from './angular-signals';

describe('AngularSignals', () => {
  let component: AngularSignals;
  let fixture: ComponentFixture<AngularSignals>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AngularSignals],
    }).compileComponents();

    fixture = TestBed.createComponent(AngularSignals);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
