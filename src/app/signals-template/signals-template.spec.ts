import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignalsTemplate } from './signals-template';

describe('SignalsTemplate', () => {
  let component: SignalsTemplate;
  let fixture: ComponentFixture<SignalsTemplate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignalsTemplate],
    }).compileComponents();

    fixture = TestBed.createComponent(SignalsTemplate);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
