import pool from "../db/pool";
import {
  Application,
  CreateApplicationInput,
  UpdateApplicationInput,
} from "../types/application.types";

export async function updateApplication(
  id: number,
  input: UpdateApplicationInput
): Promise<Application | null> {
  const { status } = input;

  const result = await pool.query<Application>(
    `UPDATE applications SET status = COALESCE($1, status) updated_at = NOW() where id = $2 RETURNING *`,
    [status, id]
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


