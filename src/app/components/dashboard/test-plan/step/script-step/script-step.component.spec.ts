import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScriptStepComponent } from './script-step.component';

describe('ScriptStepComponent', () => {
  let component: ScriptStepComponent;
  let fixture: ComponentFixture<ScriptStepComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScriptStepComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScriptStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
