import { Router } from "express";
import {
  handleAnalyticsDailyApplications,
  handleAnalyticsRunningTotal,
  handleAnalyticsTopJob,
} from "../controllers/analytics.controller";

const router = Router();

/**
 * @swagger
 * /analytics/top-jobs:
 *   get:
 *     summary: Get top job per company based on application count
 *     tags: [Analytics]
 *     description: Returns the job with the highest number of applications for each company where the job status is open.
 *     responses:
 *       200:
 *         description: List of top jobs per company
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   title:
 *                     type: string
 *                   company_name:
 *                     type: string
 *                   app_count:
 *                     type: integer
 *                   rank:
 *                     type: integer
 */
router.get("/top-jobs", handleAnalyticsTopJob);

/**
 * @swagger
 * /analytics/daily-applications:
 *   get:
 *     summary: Get daily application counts for the last 30 days
 *     tags: [Analytics]
 *     description: Returns the number of applications submitted each day over the past 30 days.
 *     responses:
 *       200:
 *         description: Daily application counts
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   date:
 *                     type: string
 *                     example: "2026-03-01"
 *                   count:
 *                     type: integer
 */
router.get("/daily-applications", handleAnalyticsDailyApplications);

/**
 * @swagger
 * /analytics/running-total:
 *   get:
 *     summary: Get running total of applications over the last 30 days
 *     tags: [Analytics]
 *     description: Returns daily application counts and cumulative running totals for the past 30 days.
 *     responses:
 *       200:
 *         description: Running total analytics data
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   date:
 *                     type: string
 *                     example: "2026-03-01"
 *                   daily_count:
 *                     type: integer
 *                   running_total:
 *                     type: integer
 */
router.get("/running-total", handleAnalyticsRunningTotal);

export default router;

