import {ComponentFixture, TestBed} from '@angular/core/testing';

import {TestRunStepDataCardComponent} from './test-run-step-data-card.component';

describe('TestRunStepDataCardComponent', () => {
  let component: TestRunStepDataCardComponent;
  let fixture: ComponentFixture<TestRunStepDataCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestRunStepDataCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestRunStepDataCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
