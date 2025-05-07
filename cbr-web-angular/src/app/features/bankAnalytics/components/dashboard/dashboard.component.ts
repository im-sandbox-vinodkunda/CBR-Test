import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import * as Highcharts from 'highcharts';
import { BankAnalyticsService } from '../../services/bank-analytics.service';
import { NotificationService } from '../../../../shared/services/notification.service';
import { HomeScreenData, ChartData } from '../../models/bank-analytics.models';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
  allHomeScreenData: HomeScreenData | null = null;
  table1Data: any[] = [];
  table2Data: any[] = [];
  chart1Data: ChartData[] = [];
  private chart: Highcharts.Chart | undefined;

  constructor(
    private bankAnalyticsService: BankAnalyticsService,
    private notificationService: NotificationService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadHomeScreenData();
  }

  loadHomeScreenData(): void {
    this.bankAnalyticsService.getHomeScreenData().subscribe({
      next: (data: HomeScreenData) => {
        if (data) {
          this.allHomeScreenData = data;
          this.table1Data = data.ubprE013;
          this.table2Data = data.ubprE630;
          this.loadHomeScreenChartData();
        } else {
          this.notificationService.showError(
            'No data available. Please add favorite banks to view analytics.'
          );
        }
      },
      error: () => {
        this.notificationService.showError('Error loading dashboard data');
      }
    });
  }

  loadHomeScreenChartData(): void {
    this.bankAnalyticsService.getHomeScreenChartData().subscribe({
      next: (data: ChartData[]) => {
        this.chart1Data = data;
        this.renderChart();
      },
      error: () => {
        this.notificationService.showError('Error loading chart data');
      }
    });
  }

  private renderChart(): void {
    if (this.chart) {
      this.chart.destroy();
    }

    this.chart = Highcharts.chart('chart1Container', {
      chart: {
        type: 'line'
      },
      title: {
        text: 'Performance Trends'
      },
      xAxis: {
        categories: this.chart1Data.map(d => d.period)
      },
      yAxis: {
        title: {
          text: 'Value'
        }
      },
      series: [{
        type: 'line',
        name: 'Performance',
        data: this.chart1Data.map(d => d.value)
      }],
      credits: {
        enabled: false
      }
    });
  }

  ngOnDestroy(): void {
    if (this.chart) {
      this.chart.destroy();
    }
  }

  navigateToManageProfiles(): void {
    this.router.navigate(['/bank-analytics/manage-profiles']);
  }
}
