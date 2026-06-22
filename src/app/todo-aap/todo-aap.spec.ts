import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoAap } from './todo-aap';

describe('TodoAap', () => {
  let component: TodoAap;
  let fixture: ComponentFixture<TodoAap>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TodoAap],
    }).compileComponents();

    fixture = TestBed.createComponent(TodoAap);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
