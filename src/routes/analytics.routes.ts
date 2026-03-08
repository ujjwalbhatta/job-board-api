import { Router } from "express";
import {
  handleAnalyticsDailyApplications,
  handleAnalyticsRunningTotal,
  handleAnalyticsTopJob,
} from "../controllers/analytics.controller";

const router = Router();

router.get("/top-jobs", handleAnalyticsTopJob);
router.get("/daily-applications", handleAnalyticsDailyApplications);
router.get("/running-total", handleAnalyticsRunningTotal);

export default router;
