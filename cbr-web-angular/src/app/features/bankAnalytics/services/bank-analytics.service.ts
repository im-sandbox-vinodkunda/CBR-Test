import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../../../core/services/api.service';
import { HomeScreenData, ChartData, Bank, PeerGroup, PeerGroupAnalysis } from '../models/bank-analytics.models';

@Injectable({
  providedIn: 'root'
})
export class BankAnalyticsService {
  constructor(private apiService: ApiService) { }

  getHomeScreenData(): Observable<HomeScreenData> {
    return this.apiService.get<HomeScreenData>('/api/HomeApi/GetHomeScreenData');
  }

  getHomeScreenChartData(): Observable<ChartData[]> {
    return this.apiService.get<ChartData[]>('/api/HomeApi/GetHomeScreenChartData');
  }

  getFavoriteBanks(): Observable<Bank[]> {
    return this.apiService.get<Bank[]>('/api/BankAnalyticsApi/GetFavoriteBanks');
  }

  addFavoriteBank(bank: Bank): Observable<any> {
    return this.apiService.post('/api/BankAnalyticsApi/AddFavoriteBank', bank);
  }

  removeFavoriteBank(institutionKey: number): Observable<any> {
    return this.apiService.delete(`/api/BankAnalyticsApi/RemoveFavoriteBank/${institutionKey}`);
  }

  getBankProfile(institutionKey: number): Observable<any> {
    return this.apiService.get(`/api/BankAnalyticsApi/GetBankProfile/${institutionKey}`);
  }

  getPeerGroups(): Observable<PeerGroup[]> {
    return this.apiService.get<PeerGroup[]>('/api/BankAnalyticsApi/GetPeerGroups');
  }

  getPeerGroupAnalysis(institutionKey: number, peerGroupId: number): Observable<PeerGroupAnalysis> {
    return this.apiService.get<PeerGroupAnalysis>(
      `/api/BankAnalyticsApi/GetPeerGroupAnalysis/${institutionKey}/${peerGroupId}`
    );
  }

  createCustomPeerGroup(peerGroup: Partial<PeerGroup>): Observable<PeerGroup> {
    return this.apiService.post<PeerGroup>('/api/BankAnalyticsApi/CreateCustomPeerGroup', peerGroup);
  }

  updateCustomPeerGroup(peerGroupId: number, peerGroup: Partial<PeerGroup>): Observable<PeerGroup> {
    return this.apiService.put<PeerGroup>(
      `/api/BankAnalyticsApi/UpdateCustomPeerGroup/${peerGroupId}`,
      peerGroup
    );
  }

  deleteCustomPeerGroup(peerGroupId: number): Observable<void> {
    return this.apiService.delete<void>(`/api/BankAnalyticsApi/DeleteCustomPeerGroup/${peerGroupId}`);
  }

  getRiskProfile(institutionKey: number): Observable<any> {
    return this.apiService.get(`/api/BankAnalyticsApi/GetRiskProfile/${institutionKey}`);
  }
}
