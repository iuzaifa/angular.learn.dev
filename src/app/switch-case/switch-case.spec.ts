import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SwitchCase } from './switch-case';

describe('SwitchCase', () => {
  let component: SwitchCase;
  let fixture: ComponentFixture<SwitchCase>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SwitchCase],
    }).compileComponents();

    fixture = TestBed.createComponent(SwitchCase);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
