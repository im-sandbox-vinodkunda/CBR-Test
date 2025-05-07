export interface ApiResponse<T> {
    success: boolean;
    data?: T;
    message?: string;
    errors?: string[];
}

export interface PaginatedResponse<T> extends ApiResponse<T> {
    totalItems: number;
    pageSize: number;
    currentPage: number;
    totalPages: number;
}
