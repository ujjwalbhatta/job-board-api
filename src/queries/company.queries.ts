import pool from "../db/pool";
import {
  Company,
  CreateCompanyInput,
  UpdateCompanyInput,
} from "../types/company.types";

export async function createCompany(
  input: CreateCompanyInput
): Promise<Company> {
  const { name, industry, size, location, website } = input;

  const result = await pool.query<Company>(
    `INSERT INTO companies (name, industry, size, location, website)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *`,
    [name, industry, size, location, website]
  );

  return result.rows[0];
}
export async function updateCompany(
  id: number,
  input: UpdateCompanyInput
): Promise<Company> {
  const { name, industry, size, location, website } = input;

  const result = await pool.query<Company>(
    `UPDATE companies
        SET name = COALESCE($1, name),
            industry = COALESCE($2, industry),
            size = COALESCE($3, size),
            location = COALESCE($4, location),
            website = COALESCE($5, website),
            updated_at = NOW()
        WHERE id = $6
        RETURNING *`,
    [name, industry, size, location, website, id]
  );
  //COALESCE so that just to update what is sent
  return result.rows[0] ?? null;
}

export async function getAllCompanies(): Promise<Company[]> {
  const result = await pool.query<Company>(
    "SELECT * FROM companies ORDER BY created_at DESC"
  );

  return result.rows;
}

export async function getCompanyById(id: number): Promise<Company | null> {
  const result = await pool.query<Company>(
    `SELECT * FROM companies WHERE id = $1`,
    [id]
  );
  return result.rows[0] ?? null;
}

export async function deleteCompany(id: number): Promise<Company | null> {
  const result = await pool.query<Company>(
    `DELETE FROM companies WHERE id = $1 RETURNING *`,
    [id]
  );
  return result.rows[0] ?? null;
}
