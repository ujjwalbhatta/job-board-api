import { Request, Response, NextFunction } from "express";

export function errorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.error(err);

  if (err.code === "23503") {
    res.status(404).json({ error: "Related resource not found" });
    return;
  }

  if (err.code === "23505") {
    res.status(409).json({ error: "Resource already exists" });
    return;
  }

  if (err.message === "JOB_NOT_FOUND") {
    res.status(404).json({ error: "Job not found or not open" });
    return;
  }

  if (err.message === "JOB_FULL") {
    res.status(409).json({ error: "No seats available" });
    return;
  }

  res.status(500).json({ error: "Internal server error" });
}
