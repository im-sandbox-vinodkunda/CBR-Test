import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

interface NavigationItem {
  path: string;
  label: string;
  icon: string;
  roles?: string[];
}

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent {
  navigationItems: NavigationItem[] = [
    { path: '/bank-analytics', label: 'Bank Analytics', icon: 'analytics' },
    { path: '/performance-index', label: 'Performance Index', icon: 'trending_up' },
    { path: '/risk-radar', label: 'Risk Radar', icon: 'warning' },
    {
      path: '/projects',
      label: 'Projects',
      icon: 'folder',
      roles: ['SystemAdministrator', 'Administrator', 'ProjectManager']
    },
    {
      path: '/admin',
      label: 'Administration',
      icon: 'admin_panel_settings',
      roles: ['SystemAdministrator', 'Administrator']
    }
  ];

  constructor(
    public authService: AuthService,
    private router: Router
  ) { }

  hasRequiredRole(item: NavigationItem): boolean {
    if (!item.roles) return true;
    return item.roles.some(role => this.authService.hasRole(role));
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
