import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { NotificationService } from '../../shared/services/notification.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    constructor(
        private authService: AuthService,
        private router: Router,
        private notificationService: NotificationService
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        if (this.authService.isAuthenticated()) {
            // Check for required roles if specified
            const requiredRoles = route.data['roles'] as string[];
            if (requiredRoles) {
                const hasRole = requiredRoles.some(role => this.authService.hasRole(role));
                if (!hasRole) {
                    this.notificationService.showError('You do not have permission to access this page');
                    this.router.navigate(['/']);
                    return false;
                }
            }
            return true;
        }

        this.notificationService.showError('Please log in to access this page');
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
        return false;
    }
}
