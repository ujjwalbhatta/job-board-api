import pool from "../db/pool";
import { Company, CreateCompanyInput } from "../types/company.types";

export async function createCompany(input: CreateCompanyInput): Promise<Company> {
    const {name, industry, size, location, website} = input

    const result = await pool.query<Company>(
        `INSERT INTO companies (name, industry, size, location, website)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *`,
        [name, industry, size, location, website]
    );

    return result.rows[0];
}