import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

interface User {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    roles: string[];
    token: string;
}

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private currentUserSubject = new BehaviorSubject<User | null>(null);
    public currentUser$ = this.currentUserSubject.asObservable();

    constructor(private apiService: ApiService) {
        const storedUser = localStorage.getItem('currentUser');
        if (storedUser) {
            this.currentUserSubject.next(JSON.parse(storedUser));
        }
    }

    login(email: string, password: string): Observable<User> {
        return this.apiService.post<User>('/api/Account/Login', { email, password })
            .pipe(
                tap(user => {
                    localStorage.setItem('currentUser', JSON.stringify(user));
                    localStorage.setItem('auth_token', user.token);
                    this.currentUserSubject.next(user);
                })
            );
    }

    logout(): void {
        localStorage.removeItem('currentUser');
        localStorage.removeItem('auth_token');
        this.currentUserSubject.next(null);
    }

    isAuthenticated(): boolean {
        return !!this.currentUserSubject.value;
    }

    hasRole(role: string): boolean {
        const user = this.currentUserSubject.value;
        return user?.roles.includes(role) ?? false;
    }

    getCurrentUser(): User | null {
        return this.currentUserSubject.value;
    }

    refreshToken(): Observable<User> {
        return this.apiService.post<User>('/api/Account/RefreshToken', {}).pipe(
            tap(user => {
                localStorage.setItem('currentUser', JSON.stringify(user));
                localStorage.setItem('auth_token', user.token);
                this.currentUserSubject.next(user);
            })
        );
    }
}
