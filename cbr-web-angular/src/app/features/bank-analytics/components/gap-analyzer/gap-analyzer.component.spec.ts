import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GapAnalyzerComponent } from './gap-analyzer.component';

describe('GapAnalyzerComponent', () => {
  let component: GapAnalyzerComponent;
  let fixture: ComponentFixture<GapAnalyzerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GapAnalyzerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GapAnalyzerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
