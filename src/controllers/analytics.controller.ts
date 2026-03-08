import { Request, Response } from "express";
import {
  getAnalyticsDailyApplication,
  getAnalyticsRunningTotal,
  getAnalyticsTopJob,
} from "../queries/analytics.queries";

export async function handleAnalyticsTopJob(req: Request, res: Response) {
  const analytic = await getAnalyticsTopJob();
  res.json(analytic);
}

export async function handleAnalyticsDailyApplications(
  req: Request,
  res: Response
) {
  const analytics = await getAnalyticsDailyApplication();
  res.json(analytics);
}

export async function handleAnalyticsRunningTotal(req: Request, res: Response) {
  const analytics = await getAnalyticsRunningTotal();
  res.json(analytics);
}
