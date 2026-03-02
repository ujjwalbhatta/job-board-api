export interface Pagination {
  page?: number;
  limit?: number;
  cursor?: number;
}

export interface PaginatedResult<T> {
  data: T[];
  total: number;
  page: number;
  totalPages: number;
}

export interface CursorResult<T> {
  data: T[];
  nextCursor: number | null;
}
