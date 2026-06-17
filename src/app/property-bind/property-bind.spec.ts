import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertyBind } from './property-bind';

describe('PropertyBind', () => {
  let component: PropertyBind;
  let fixture: ComponentFixture<PropertyBind>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PropertyBind],
    }).compileComponents();

    fixture = TestBed.createComponent(PropertyBind);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
