import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AngularPipes } from './angular-pipes';

describe('AngularPipes', () => {
  let component: AngularPipes;
  let fixture: ComponentFixture<AngularPipes>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AngularPipes],
    }).compileComponents();

    fixture = TestBed.createComponent(AngularPipes);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
