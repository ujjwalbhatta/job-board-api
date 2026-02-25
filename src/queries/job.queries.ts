import pool from "../db/pool";
import { Job, CreateJobInput, UpdateJobInput } from "../types/job.types";

export async function getAllJobs(): Promise<Job[]> {
  const result = await pool.query<Job>(
    "SELECT * FROM jobs ORDER BY posted_at DESC"
  );
  return result.rows;
}

export async function getJobById(id: number): Promise<Job | null> {
  const result = await pool.query<Job>("SELECT * FROM jobs WHERE id = $1", [
    id,
  ]);
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
