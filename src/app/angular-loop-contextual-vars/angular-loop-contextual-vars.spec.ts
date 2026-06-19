import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AngularLoopContextualVars } from './angular-loop-contextual-vars';

describe('AngularLoopContextualVars', () => {
  let component: AngularLoopContextualVars;
  let fixture: ComponentFixture<AngularLoopContextualVars>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AngularLoopContextualVars],
    }).compileComponents();

    fixture = TestBed.createComponent(AngularLoopContextualVars);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
