import pool from "../db/pool";
import {
  DailyApplication,
  RunningTotal,
  TopJob,
} from "../types/analytics.types";

export async function getAnalyticsTopJob(): Promise<TopJob[]> {
  const result = await pool.query<TopJob>(
    `
        WITH ranked AS (
            SELECT 
                j.id,
                j.title,
                c.name AS company_name,
                COUNT(a.id) AS app_count,
                RANK() OVER(PARTITION BY j.company_id ORDER BY COUNT(a.id) DESC) rank 
            FROM jobs j 
            JOIN companies c ON j.company_id = c.id 
            LEFT JOIN applications a ON a.job_id = j.id
            WHERE j.status = 'open'
            GROUP BY j.id, c.name, j.title, j.company_id
        )
        SELECT * FROM ranked WHERE rank = '1'
        `
  );
  return result.rows;
}

export async function getAnalyticsDailyApplication(): Promise<
  DailyApplication[]
> {
  const result = await pool.query<DailyApplication>(`
      SELECT
        dates.date::TEXT AS date,
        COALESCE(COUNT(a.id), 0)::INT AS count
      FROM (
        SELECT generate_series(
          NOW() - INTERVAL '30 days',
          NOW(),
          INTERVAL '1 day'
        )::DATE AS date
      ) AS dates
      LEFT JOIN applications a ON DATE(a.applied_at) = dates.date
      GROUP BY dates.date
      ORDER BY dates.date ASC
    `);
  return result.rows;
}

export async function getAnalyticsRunningTotal(): Promise<RunningTotal[]> {
  const result = await pool.query<RunningTotal>(`
    WITH daily AS(
      SELECT
        dates.date::TEXT AS date,
        COALESCE(COUNT(a.id), 0)::INT AS count
      FROM (
        SELECT generate_series(
          NOW() - INTERVAL '30 days',
          NOW(),
          INTERVAL '1 day'
        )::DATE AS date
      ) AS dates
      LEFT JOIN applications a ON DATE(a.applied_at) = dates.date
      GROUP BY dates.date
      ORDER BY dates.date ASC
    )

    SELECT 
        date, 
        count AS daily_count,
        SUM(count::INT) OVER (ORDER BY date) AS running_total
        FROM daily
    `);
  return result.rows;
}
