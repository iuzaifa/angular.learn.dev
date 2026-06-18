import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventsDemo } from './events-demo';

describe('EventsDemo', () => {
  let component: EventsDemo;
  let fixture: ComponentFixture<EventsDemo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EventsDemo],
    }).compileComponents();

    fixture = TestBed.createComponent(EventsDemo);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
