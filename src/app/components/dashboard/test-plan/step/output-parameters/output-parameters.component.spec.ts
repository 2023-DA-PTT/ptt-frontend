import {ComponentFixture, TestBed} from '@angular/core/testing';

import {OutputParametersComponent} from './output-parameters.component';

describe('OutputParametersComponent', () => {
  let component: OutputParametersComponent;
  let fixture: ComponentFixture<OutputParametersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OutputParametersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OutputParametersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
