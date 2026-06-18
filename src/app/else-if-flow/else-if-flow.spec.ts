import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElseIfFlow } from './else-if-flow';

describe('ElseIfFlow', () => {
  let component: ElseIfFlow;
  let fixture: ComponentFixture<ElseIfFlow>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ElseIfFlow],
    }).compileComponents();

    fixture = TestBed.createComponent(ElseIfFlow);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
