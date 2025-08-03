export type PaginatedResponse<T> = {
    count: number;
    next: string | null;
    previous: string | null;
    results: T[];
};

export type PaginationQueryParams = {
    page?: number;
    page_size?: number;
    search?: string;
    ordering?: string;
    filters?: Partial<Record<string, string | number | boolean>>;
};
