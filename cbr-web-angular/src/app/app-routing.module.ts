import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './core/components/layout/layout.component';
import { AuthGuard } from './core/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'bank-analytics',
        loadChildren: () =>
          import('./features/bankAnalytics/bank-analytics.module').then(
            (m) => m.BankAnalyticsModule
          ),
      },
      {
        path: 'performance-index',
        loadChildren: () =>
          import('./features/performanceIndex/performance-index.module').then(
            (m) => m.PerformanceIndexModule
          ),
      },
      {
        path: 'risk-radar',
        loadChildren: () =>
          import('./features/riskRadar/risk-radar.module').then(
            (m) => m.RiskRadarModule
          ),
      },
      {
        path: 'projects',
        loadChildren: () =>
          import('./features/projects/projects.module').then(
            (m) => m.ProjectsModule
          ),
      },
      {
        path: 'cd',
        loadChildren: () => import('./features/cd/cd.module').then((m) => m.CdModule),
      },
      {
        path: 'admin',
        loadChildren: () =>
          import('./features/administration/administration.module').then(
            (m) => m.AdministrationModule
          ),
      },
      { path: '', redirectTo: 'bank-analytics', pathMatch: 'full' },
    ],
  },
  {
    path: '',
    loadChildren: () => import('./features/auth/auth.module').then((m) => m.AuthModule),
  },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
