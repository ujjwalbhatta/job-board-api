import { Request } from "express";
import { Pagination } from "../types/pagination.types";

export function getPagination(req: Request): Pagination {
  const { limit, page, cursor } = req.query;

  return {
    page: page ? Math.max(1, Number(page)) : 1,
    limit: limit ? Math.min(100, Number(limit)) : 10,
    cursor: limit ? Number(cursor) : undefined,
  };
}
