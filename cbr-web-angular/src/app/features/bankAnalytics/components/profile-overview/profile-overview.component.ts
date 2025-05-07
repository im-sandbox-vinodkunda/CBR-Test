import { Component, OnInit } from '@angular/core';
import { BankAnalyticsService } from '../../services/bank-analytics.service';
import { NotificationService } from '../../../../shared/services/notification.service';
import { Bank } from '../../models/bank-analytics.models';

interface BankProfile {
  introduction: any;
  detailsQtd: any[];
  detailsYtd: any[];
  details: any[];
  ytdHeaders: any;
  qtrHeaders: any;
  tableHeaders: any;
}

@Component({
  selector: 'app-profile-overview',
  templateUrl: './profile-overview.component.html',
  styleUrls: ['./profile-overview.component.scss']
})
export class ProfileOverviewComponent implements OnInit {
  favoriteBanks: Bank[] = [];
  selectedBank?: Bank;
  bankProfile: BankProfile = {
    introduction: null,
    detailsQtd: [],
    detailsYtd: [],
    details: [],
    ytdHeaders: {},
    qtrHeaders: {},
    tableHeaders: {}
  };
  activeTab = 'QTD';

  constructor(
    private bankAnalyticsService: BankAnalyticsService,
    private notificationService: NotificationService
  ) { }

  ngOnInit(): void {
    this.loadFavoriteBanks();
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
    this.loadBankProfile(bank.institutionKey);
  }

  loadBankProfile(institutionKey: number): void {
    this.bankAnalyticsService.getBankProfile(institutionKey).subscribe({
      next: (profile) => {
        this.bankProfile = profile;
      },
      error: () => {
        this.notificationService.showError('Error loading bank profile');
      }
    });
  }

  setActiveTab(tab: string): void {
    this.activeTab = tab;
  }
}
