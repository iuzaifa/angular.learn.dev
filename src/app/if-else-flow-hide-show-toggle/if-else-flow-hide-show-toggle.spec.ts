import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IfElseFlowHideShowToggle } from './if-else-flow-hide-show-toggle';

describe('IfElseFlowHideShowToggle', () => {
  let component: IfElseFlowHideShowToggle;
  let fixture: ComponentFixture<IfElseFlowHideShowToggle>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IfElseFlowHideShowToggle],
    }).compileComponents();

    fixture = TestBed.createComponent(IfElseFlowHideShowToggle);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
