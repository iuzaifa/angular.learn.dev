import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FunctionCallOnButtonClick } from './function-call-on-button-click';

describe('FunctionCallOnButtonClick', () => {
  let component: FunctionCallOnButtonClick;
  let fixture: ComponentFixture<FunctionCallOnButtonClick>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FunctionCallOnButtonClick],
    }).compileComponents();

    fixture = TestBed.createComponent(FunctionCallOnButtonClick);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
