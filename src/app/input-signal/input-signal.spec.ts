import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputSignal } from './input-signal';

describe('InputSignal', () => {
  let component: InputSignal;
  let fixture: ComponentFixture<InputSignal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputSignal],
    }).compileComponents();

    fixture = TestBed.createComponent(InputSignal);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
