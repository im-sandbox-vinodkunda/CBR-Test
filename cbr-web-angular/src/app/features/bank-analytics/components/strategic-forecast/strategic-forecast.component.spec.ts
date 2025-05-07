import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StrategicForecastComponent } from './strategic-forecast.component';

describe('StrategicForecastComponent', () => {
  let component: StrategicForecastComponent;
  let fixture: ComponentFixture<StrategicForecastComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StrategicForecastComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StrategicForecastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
