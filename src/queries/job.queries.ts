import pool from "../db/pool";
import {
  Job,
  CreateJobInput,
  UpdateJobInput,
  JobWithCompany,
  JobDetail,
  JobFilterParams,
} from "../types/job.types";

export async function getAllJobs(
  filters: JobFilterParams
): Promise<JobWithCompany[]> {
  const { search, remote, job_type, status, salary_max, salary_min, tags } =
    filters;

  console.log(tags);

  const conditions: string[] = []; //SQL
  const params: any[] = []; //actual values

  if (search) {
    params.push(`%${search}%`);
    conditions.push(`j.title ILIKE $${params.length}`);
  }

  if (remote) {
    params.push(remote);
    conditions.push(`j.remote = $${params.length}`);
  }

  if (job_type) {
    params.push(job_type);
    conditions.push(`j.job_type = $${params.length}`);
  }

  if (status) {
    params.push(status);
    conditions.push(`j.status = $${params.length}`);
  }

  if (salary_max) {
    params.push(salary_max);
    conditions.push(`j.salary_max <= $${params.length}`);
  }

  if (salary_min) {
    params.push(salary_min);
    conditions.push(`j.salary_min >= $${params.length}`);
  }
  if (tags && tags.length > 0) {
    params.push(tags);
    conditions.push(`
      j.id IN (
        SELECT jt.job_id
        FROM job_tags jt
        JOIN tags t ON t.id = jt.tag_id
        WHERE t.name = ANY($${params.length})
        GROUP BY jt.job_id
        HAVING COUNT(DISTINCT t.id) = ${tags.length}
      )
    `);
  }

  //After grouping, you check: how many distinct matching tags does this job have? If the user asked for 2 tags, the job must have matched exactly 2. Job 1 matched both → included. Job 2 matched only 1 → excluded.

  const where =
    conditions.length > 0 ? "WHERE " + conditions.join(" AND ") : "";

  const result = await pool.query<JobWithCompany>(
    `SELECT j.*, c.name AS company_name, c.industry AS company_industry 
    FROM jobs j 
    INNER JOIN companies c ON j.company_id = c.id 
    ${where} 
    ORDER BY j.posted_at DESC`,
    params
  );

  return result.rows;
}

export async function getJobById(id: number): Promise<JobDetail | null> {
  const result = await pool.query<JobDetail>(
    `SELECT 
    j.*, 
    c.name AS company_name, 
    c.industry AS company_industry, 
    COALESCE(
      JSON_AGG(
        JSON_BUILD_OBJECT('id',t.id,'name',t.name)
      ) FILTER (WHERE t.id IS NOT NULL),
      '[]'
    ) AS tags 
    FROM jobs j 
    INNER JOIN companies c ON j.company_id = c.id 
    LEFT JOIN job_tags jt ON j.id = jt.job_id 
    LEFT JOIN tags t ON t.id = jt.tag_id 
    WHERE j.id = $1 
    GROUP BY j.id, c.name, c.industry`,
    [id]
  );
  return result.rows[0] ?? null;
}

export async function getJobsByCompany(company_id: number): Promise<Job[]> {
  const result = await pool.query<Job>(
    "SELECT * FROM jobs WHERE company_id = $1 ORDER BY posted_at DESC",
    [company_id]
  );
  return result.rows;
}

export async function createJob(input: CreateJobInput): Promise<Job> {
  const {
    company_id,
    title,
    description,
    salary_min,
    salary_max,
    job_type,
    remote,
    status,
    expires_at,
    seats,
  } = input;
  const result = await pool.query<Job>(
    `INSERT INTO jobs (company_id, title, description, salary_min, salary_max, job_type, remote, status, expires_at, seats)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
     RETURNING *`,
    [
      company_id,
      title,
      description,
      salary_min,
      salary_max,
      job_type,
      remote,
      status,
      expires_at,
      seats,
    ]
  );
  return result.rows[0];
}

export async function updateJob(
  id: number,
  input: UpdateJobInput
): Promise<Job | null> {
  const {
    title,
    description,
    salary_min,
    salary_max,
    job_type,
    remote,
    status,
    expires_at,
    seats,
  } = input;
  const result = await pool.query<Job>(
    `UPDATE jobs
     SET title       = COALESCE($1, title),
         description = COALESCE($2, description),
         salary_min  = COALESCE($3, salary_min),
         salary_max  = COALESCE($4, salary_max),
         job_type    = COALESCE($5, job_type),
         remote      = COALESCE($6, remote),
         status      = COALESCE($7, status),
         expires_at  = COALESCE($8, expires_at),
         seats       = COALESCE($9, seats),
         updated_at  = NOW()
     WHERE id = $10
     RETURNING *`,
    [
      title,
      description,
      salary_min,
      salary_max,
      job_type,
      remote,
      status,
      expires_at,
      seats,
      id,
    ]
  );
  return result.rows[0] ?? null;
}

export async function deleteJob(id: number): Promise<Job | null> {
  const result = await pool.query<Job>(
    "DELETE FROM jobs WHERE id = $1 RETURNING *",
    [id]
  );
  return result.rows[0] ?? null;
}

export async function addTagToJob(
  job_id: number,
  tag_id: number
): Promise<void> {
  await pool.query(
    `INSERT INTO job_tags(job_id, tag_id) VALUES ($1,$2) ON CONFLICT DO NOTHING`,
    [job_id, tag_id]
  );
}

export async function removeTagFromJob(
  job_id: number,
  tag_id: number
): Promise<void> {
  await pool.query("DELETE FROM job_tags WHERE job_id = $1 AND tag_id = $2", [
    job_id,
    tag_id,
  ]);
}
