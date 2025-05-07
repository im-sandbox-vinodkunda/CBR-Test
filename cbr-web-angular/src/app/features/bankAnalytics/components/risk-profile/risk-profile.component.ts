import { Component, OnInit, OnDestroy } from '@angular/core';
import { BankAnalyticsService } from '../../services/bank-analytics.service';
import { NotificationService } from '../../../../shared/services/notification.service';
import { Bank, RiskProfile } from '../../models/bank-analytics.models';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-risk-profile',
  templateUrl: './risk-profile.component.html',
  styleUrls: ['./risk-profile.component.scss']
})
export class RiskProfileComponent implements OnInit, OnDestroy {
  selectedBank?: Bank;
  favoriteBanks: Bank[] = [];
  riskProfile?: RiskProfile;
  historicalChart?: Highcharts.Chart;

  constructor(
    private bankAnalyticsService: BankAnalyticsService,
    private notificationService: NotificationService
  ) { }

  ngOnInit(): void {
    this.loadFavoriteBanks();
  }

  ngOnDestroy(): void {
    if (this.historicalChart) {
      this.historicalChart.destroy();
    }
  }

  loadFavoriteBanks(): void {
    this.bankAnalyticsService.getFavoriteBanks().subscribe({
      next: (banks) => {
        this.favoriteBanks = banks;
        if (banks.length > 0) {
          this.selectBank(banks[0]);
        }
      },
      error: () => {
        this.notificationService.showError('Error loading favorite banks');
      }
    });
  }

  selectBank(bank: Bank): void {
    this.selectedBank = bank;
    this.loadRiskProfile(bank.institutionKey);
  }

  private loadRiskProfile(institutionKey: number): void {
    this.bankAnalyticsService.getRiskProfile(institutionKey).subscribe({
      next: (profile) => {
        this.riskProfile = profile;
        this.renderHistoricalChart();
      },
      error: () => {
        this.notificationService.showError('Error loading risk profile');
      }
    });
  }

  private renderHistoricalChart(): void {
    if (!this.riskProfile?.historicalData) return;

    if (this.historicalChart) {
      this.historicalChart.destroy();
    }

    this.historicalChart = Highcharts.chart('historical-chart', {
      chart: {
        type: 'line'
      },
      title: {
        text: 'Risk Score Trend'
      },
      xAxis: {
        categories: this.riskProfile.historicalData.map(point => point.period)
      },
      yAxis: {
        title: {
          text: 'Risk Score'
        },
        min: 0,
        max: 100
      },
      series: [{
        type: 'line',
        name: 'Risk Score',
        data: this.riskProfile.historicalData.map(point => point.value)
      }],
      plotOptions: {
        line: {
          dataLabels: {
            enabled: true
          }
        }
      },
      credits: {
        enabled: false
      }
    });
  }

  getTrendIcon(trend: 'up' | 'down' | 'neutral'): string {
    return trend === 'up' ? 'trending_up' :
      trend === 'down' ? 'trending_down' : 'trending_flat';
  }

  getTrendClass(trend: 'up' | 'down' | 'neutral'): string {
    return trend === 'up' ? 'trend-up' :
      trend === 'down' ? 'trend-down' : 'trend-neutral';
  }

  getImpactClass(impact: 'high' | 'medium' | 'low'): string {
    return `impact-${impact.toLowerCase()}`;
  }
}
