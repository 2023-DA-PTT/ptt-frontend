import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestPlanListComponent } from './test-plan-list.component';

describe('TestPlanListComponent', () => {
  let component: TestPlanListComponent;
  let fixture: ComponentFixture<TestPlanListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestPlanListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestPlanListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
