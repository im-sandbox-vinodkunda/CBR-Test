import { TestBed } from '@angular/core/testing';

import { BankAnalyticsService } from './bank-analytics.service';

describe('BankAnalyticsService', () => {
  let service: BankAnalyticsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BankAnalyticsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
