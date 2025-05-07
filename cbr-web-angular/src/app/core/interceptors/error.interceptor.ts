import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ErrorHandlerService } from '../services/error-handler.service';
import { NotificationService } from '../../shared/services/notification.service';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(
    private errorHandler: ErrorHandlerService,
    private notificationService: NotificationService,
    private authService: AuthService,
    private router: Router
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          // Try to refresh the token first
          if (!request.url.includes('refreshToken')) {
            return this.authService.refreshToken().pipe(
              catchError(() => {
                this.authService.logout();
                this.router.navigate(['/login'], { 
                  queryParams: { returnUrl: this.router.url }
                });
                this.notificationService.showError('Your session has expired. Please log in again.');
                return throwError(() => error);
              })
            );
          }
        }

        let errorMessage = 'An error occurred';

        if (error.error?.message) {
          errorMessage = error.error.message;
        } else if (error.error?.errors) {
          errorMessage = Object.values(error.error.errors).join('\n');
        } else if (error.status === 0) {
          errorMessage = 'Unable to connect to the server. Please check your internet connection.';
        } else if (error.status === 403) {
          errorMessage = 'You do not have permission to perform this action.';
        } else if (error.status === 404) {
          errorMessage = 'The requested resource was not found.';
        } else if (error.status >= 500) {
          errorMessage = 'A server error occurred. Please try again later.';
        }

        this.notificationService.showError(errorMessage);
        return throwError(() => error);
      })
    );
  }
}
