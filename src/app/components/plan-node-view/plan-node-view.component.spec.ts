import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanNodeViewComponent } from './plan-node-view.component';

describe('PlanNodeViewComponent', () => {
  let component: PlanNodeViewComponent;
  let fixture: ComponentFixture<PlanNodeViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlanNodeViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlanNodeViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
