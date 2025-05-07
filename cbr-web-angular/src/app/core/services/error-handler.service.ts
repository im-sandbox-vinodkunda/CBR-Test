import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { NotificationService } from '../../shared/services/notification.service';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class ErrorHandlerService {
    constructor(
        private notificationService: NotificationService,
        private router: Router
    ) { }

    handleError(error: Error | HttpErrorResponse): void {
        if (error instanceof HttpErrorResponse) {
            this.handleHttpError(error);
        } else {
            this.handleGenericError(error);
        }
    }

    private handleHttpError(error: HttpErrorResponse): void {
        let errorMessage = 'An error occurred';

        if (error.status === 401) {
            this.router.navigate(['/login']);
            errorMessage = 'Your session has expired. Please log in again.';
        } else if (error.status === 403) {
            errorMessage = 'You do not have permission to perform this action.';
        } else if (error.error?.message) {
            errorMessage = error.error.message;
        } else if (error.status === 0) {
            errorMessage = 'Unable to connect to the server. Please check your internet connection.';
        } else {
            errorMessage = `Error: ${error.message}`;
        }

        this.notificationService.showError(errorMessage);
    }

    private handleGenericError(error: Error): void {
        this.notificationService.showError(error.message);
    }
}
