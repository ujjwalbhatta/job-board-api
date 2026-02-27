import pool from "../db/pool";
import { CreateTagInput, Tag } from "../types/tag.types";

export async function createTag(input: CreateTagInput): Promise<Tag> {
  const result = await pool.query<Tag>(
    "INSERT INTO tags (name) VALUES ($1) RETURNING *",
    [input.name]
  );
  return result.rows[0];
}

export async function getAllTags(): Promise<Tag[]> {
  const result = await pool.query<Tag>("SELECT * FROM tags ORDER BY name");
  return result.rows;
}
