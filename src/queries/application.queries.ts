import pool from "../db/pool";
import {
  Application,
  CreateApplicationInput,
  UpdateApplicationInput,
} from "../types/application.types";

export async function createApplication(
  input: CreateApplicationInput
): Promise<Application> {
  const { job_id, candidate_id, status, cover_letter } = input;

  const result = await pool.query<Application>(
    `INSERT INTO applications (job_id, candidate_id, status, cover_letter) VALUES ($1, $2, $3, $4) RETURNING *`,
    [job_id, candidate_id, status, cover_letter]
  );

  return result.rows[0];
}

export async function updateApplication(
  id: number,
  input: UpdateApplicationInput
): Promise<Application | null> {
  const { job_id, candidate_id, status, cover_letter } = input;

  const result = await pool.query<Application>(
    `UPDATE applications SET job_id = COALESCE($1, job_id), candidate_id = COALESCE($2, candidate_id), status = COALESCE($3, status), cover_letter = COALESCE($4, cover_letter), updated_at = NOW() where id = $5 RETURNING *`,
    [job_id, candidate_id, status, cover_letter, id]
  );

  return result.rows[0];
}

export async function getAllApplication(): Promise<Application[]> {
  const result = await pool.query<Application>(
    "SELECT * FROM applications ORDER BY applied_at DESC"
  );

  return result.rows;
}

export async function getApplicationById(
  id: number
): Promise<Application | null> {
  const result = await pool.query<Application>(
    `SELECT * FROM applications WHERE id=$1`,
    [id]
  );

  return result.rows[0] ?? null;
}

export async function deleteApplication(
  id: number
): Promise<Application | null> {
  const result = await pool.query<Application>(
    `DELETE FROM applications WHERE id=$1 RETURNING *`,
    [id]
  );

  return result.rows[0];
}
