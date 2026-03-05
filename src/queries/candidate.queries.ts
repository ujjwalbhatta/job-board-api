import pool from "../db/pool";
import {
  Candidate,
  CreateCandidateInput,
  UpdateCandidateInput,
} from "../types/candidate.types";

export async function createCandidate(
  input: CreateCandidateInput
): Promise<Candidate> {
  const { name, email, phone, skills, bio } = input;

  const result = await pool.query<Candidate>(
    `INSERT INTO candidates (name, email, phone, skills, bio) VALUES ($1, $2, $3, $4, $5) RETURNING *`,
    [name, email, phone, skills, bio]
  );

  return result.rows[0];
}

export async function updateCandidate(
  id: number,
  input: UpdateCandidateInput
): Promise<Candidate | null> {
  const { name, phone, skills, bio } = input;

  const result = await pool.query<Candidate>(
    `UPDATE candidates SET name = COALESCE($1, name), phone = COALESCE($2, phone), skills = COALESCE($3, skills), bio = COALESCE($4, bio), updated_at = NOW() where id = $5 RETURNING *`,
    [name, phone, skills, bio, id]
  );

  return result.rows[0];
}

export async function getAllCandidates(): Promise<Candidate[]> {
  const result = await pool.query<Candidate>(
    "SELECT * FROM candidates ORDER BY created_at DESC"
  );

  return result.rows;
}

export async function getCandidateById(id: number): Promise<Candidate | null> {
  const result = await pool.query<Candidate>(
    `SELECT * FROM candidates WHERE id=$1`,
    [id]
  );

  return result.rows[0] ?? null;
}

export async function deleteCandidate(id: number): Promise<Candidate | null> {
  const result = await pool.query<Candidate>(
    `DELETE FROM candidates WHERE id=$1 RETURNING *`,
    [id]
  );

  return result.rows[0];
}
