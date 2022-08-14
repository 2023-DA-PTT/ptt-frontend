import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestPlanOverviewComponent } from './test-plan-overview.component';

describe('TestPlanOverviewComponent', () => {
  let component: TestPlanOverviewComponent;
  let fixture: ComponentFixture<TestPlanOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestPlanOverviewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestPlanOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
