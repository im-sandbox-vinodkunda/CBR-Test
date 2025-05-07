import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { ApiResponse, PaginatedResponse } from '../models/api-response.model';
import { ErrorHandlerService } from './error-handler.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = environment.apiUrl;

  constructor(
    private http: HttpClient,
    private errorHandler: ErrorHandlerService
  ) { }

  get<T>(path: string, params: HttpParams = new HttpParams()): Observable<T> {
    return this.http.get<ApiResponse<T>>(`${this.baseUrl}${path}`, { params })
      .pipe(
        map(response => this.handleResponse<T>(response)),
        catchError(error => {
          this.errorHandler.handleError(error);
          return throwError(() => error);
        })
      );
  }

  getPaginated<T>(path: string, params: HttpParams = new HttpParams()): Observable<PaginatedResponse<T>> {
    return this.http.get<PaginatedResponse<T>>(`${this.baseUrl}${path}`, { params })
      .pipe(
        catchError(error => {
          this.errorHandler.handleError(error);
          return throwError(() => error);
        })
      );
  }

  post<T>(path: string, body: any = {}): Observable<T> {
    return this.http.post<ApiResponse<T>>(
      `${this.baseUrl}${path}`,
      body,
      { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) }
    ).pipe(
      map(response => this.handleResponse<T>(response)),
      catchError(error => {
        this.errorHandler.handleError(error);
        return throwError(() => error);
      })
    );
  }

  put<T>(path: string, body: any = {}): Observable<T> {
    return this.http.put<ApiResponse<T>>(
      `${this.baseUrl}${path}`,
      body,
      { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) }
    ).pipe(
      map(response => this.handleResponse<T>(response)),
      catchError(error => {
        this.errorHandler.handleError(error);
        return throwError(() => error);
      })
    );
  }

  delete<T>(path: string): Observable<T> {
    return this.http.delete<ApiResponse<T>>(`${this.baseUrl}${path}`)
      .pipe(
        map(response => this.handleResponse<T>(response)),
        catchError(error => {
          this.errorHandler.handleError(error);
          return throwError(() => error);
        })
      );
  }

  private handleResponse<T>(response: ApiResponse<T>): T {
    if (!response.success) {
      throw new Error(response.message || 'An error occurred');
    }
    return response.data as T;
  }
}
