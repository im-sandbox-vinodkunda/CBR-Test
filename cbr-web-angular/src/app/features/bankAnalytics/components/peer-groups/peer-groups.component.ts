import { Component, OnInit, OnDestroy } from '@angular/core';
import { BankAnalyticsService } from '../../services/bank-analytics.service';
import { NotificationService } from '../../../../shared/services/notification.service';
import { Bank, PeerGroup, PeerGroupAnalysis } from '../../models/bank-analytics.models';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-peer-groups',
  templateUrl: './peer-groups.component.html',
  styleUrls: ['./peer-groups.component.scss']
})
export class PeerGroupsComponent implements OnInit, OnDestroy {
  selectedBank?: Bank;
  selectedPeerGroup?: PeerGroup;
  favoriteBanks: Bank[] = [];
  peerGroups: PeerGroup[] = [];
  peerGroupAnalysis?: PeerGroupAnalysis;
  charts: { [key: string]: Highcharts.Chart } = {};

  constructor(
    private bankAnalyticsService: BankAnalyticsService,
    private notificationService: NotificationService
  ) { }

  ngOnInit(): void {
    this.loadFavoriteBanks();
    this.loadPeerGroups();
  }

  ngOnDestroy(): void {
    Object.values(this.charts).forEach(chart => chart.destroy());
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

  loadPeerGroups(): void {
    this.bankAnalyticsService.getPeerGroups().subscribe({
      next: (groups) => {
        this.peerGroups = groups;
      },
      error: () => {
        this.notificationService.showError('Error loading peer groups');
      }
    });
  }

  selectBank(bank: Bank): void {
    this.selectedBank = bank;
    if (this.selectedPeerGroup) {
      this.loadPeerGroupAnalysis();
    }
  }

  selectPeerGroup(group: PeerGroup): void {
    this.selectedPeerGroup = group;
    if (this.selectedBank) {
      this.loadPeerGroupAnalysis();
    }
  }

  private loadPeerGroupAnalysis(): void {
    if (!this.selectedBank || !this.selectedPeerGroup) return;

    this.bankAnalyticsService.getPeerGroupAnalysis(
      this.selectedBank.institutionKey,
      this.selectedPeerGroup.id
    ).subscribe({
      next: (analysis) => {
        this.peerGroupAnalysis = analysis;
        this.renderCharts();
      },
      error: () => {
        this.notificationService.showError('Error loading peer group analysis');
      }
    });
  }

  private renderCharts(): void {
    if (!this.peerGroupAnalysis) return;

    // Destroy existing charts
    Object.values(this.charts).forEach(chart => chart.destroy());
    this.charts = {};

    // Create new charts
    Object.entries(this.peerGroupAnalysis.charts).forEach(([key, data]) => {
      const containerId = `chart-${key}`;
      this.charts[key] = Highcharts.chart(containerId, {
        chart: {
          type: 'line'
        },
        title: {
          text: key
        },
        xAxis: {
          categories: data.map(point => point.period)
        },
        yAxis: {
          title: {
            text: 'Value'
          }
        },
        series: [{
          type: 'line',
          name: 'Bank',
          data: data.map(point => point.value)
        }],
        credits: {
          enabled: false
        }
      });
    });
  }
}
