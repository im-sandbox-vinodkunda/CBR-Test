import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BankAnalyticsRoutingModule } from './bank-analytics-routing.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProfileOverviewComponent } from './components/profile-overview/profile-overview.component';
import { PeerGroupsComponent } from './components/peer-groups/peer-groups.component';
import { RiskProfileComponent } from './components/risk-profile/risk-profile.component';
import { SharedModule } from '../../shared/shared.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
    declarations: [
        DashboardComponent,
        ProfileOverviewComponent,
        PeerGroupsComponent,
        RiskProfileComponent
    ],
    imports: [
        CommonModule,
        BankAnalyticsRoutingModule,
        SharedModule,
        NgbModule,
        MatExpansionModule,
        MatIconModule,
        MatTableModule,
        MatSortModule,
        MatPaginatorModule,
        MatTabsModule,
        MatCardModule,
        MatFormFieldModule,
        MatSelectModule
    ]
})
export class BankAnalyticsModule { }
