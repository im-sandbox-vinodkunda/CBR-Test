import { Component } from '@angular/core';

interface NavLink {
  path: string;
  label: string;
}

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent {
  navLinks: NavLink[] = [
    { path: 'dashboard', label: 'Dashboard' },
    { path: 'profile-overview', label: 'Profile Overview' },
    { path: 'peer-groups', label: 'Peer Groups' },
    { path: 'risk-profile', label: 'Risk Profile' }
  ];
}
