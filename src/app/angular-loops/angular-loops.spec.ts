import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AngularLoops } from './angular-loops';

describe('AngularLoops', () => {
  let component: AngularLoops;
  let fixture: ComponentFixture<AngularLoops>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AngularLoops],
    }).compileComponents();

    fixture = TestBed.createComponent(AngularLoops);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
