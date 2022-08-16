import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpStepComponent } from './http-step.component';

describe('HttpStepComponent', () => {
  let component: HttpStepComponent;
  let fixture: ComponentFixture<HttpStepComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HttpStepComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HttpStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
