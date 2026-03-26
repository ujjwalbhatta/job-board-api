import { Request, Response } from "express";
import { createTag, getAllTags } from "../queries/tag.queries";

export async function handleGetAllTags(req: Request, res: Response) {
  const tags = await getAllTags();
  res.json(tags);
}

export async function handleCreateTag(req: Request, res: Response) {
  const tag = await createTag(req.body);
  res.status(201).json(tag);
}
