import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './components/layout/layout.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProfileOverviewComponent } from './components/profile-overview/profile-overview.component';
import { PeerGroupsComponent } from './components/peer-groups/peer-groups.component';
import { RiskProfileComponent } from './components/risk-profile/risk-profile.component';
import { AuthGuard } from '../../core/guards/auth.guard';

const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        canActivate: [AuthGuard],
        children: [
            { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
            { path: 'dashboard', component: DashboardComponent },
            { path: 'profile-overview', component: ProfileOverviewComponent },
            {
                path: 'peer-groups',
                component: PeerGroupsComponent,
                data: { roles: ['SystemAdministrator', 'Administrator', 'ProjectManager'] }
            },
            {
                path: 'risk-profile',
                component: RiskProfileComponent,
                data: { roles: ['SystemAdministrator', 'Administrator', 'ProjectManager'] }
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class BankAnalyticsRoutingModule { }
