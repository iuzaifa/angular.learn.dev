import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignalDe } from './signal-de';

describe('SignalDe', () => {
  let component: SignalDe;
  let fixture: ComponentFixture<SignalDe>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignalDe],
    }).compileComponents();

    fixture = TestBed.createComponent(SignalDe);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
