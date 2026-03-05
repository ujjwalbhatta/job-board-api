import { Request, Response } from "express";
import {
  createCandidate,
  deleteCandidate,
  getAllCandidates,
  getCandidateById,
  updateCandidate,
} from "../queries/candidate.queries";

export async function handleCreateCandidate(req: Request, res: Response) {
  try {
    const candidate = await createCandidate(req.body);
    res.status(201).json(candidate);
  } catch (err: any) {
    if (err.code === "23505") {
      res.status(409).json({ error: "Email already exists" });
      return;
    }
    throw err;
  }
}

export async function handleUpdateCandidate(req: Request, res: Response) {
  const id = Number(req.params.id);

  const candidate = await updateCandidate(id, req.body);

  if (!candidate) {
    res.status(404).json({ error: "Candidate not found" });
    return;
  }

  res.json(candidate);
}

export async function handleGetAllCandidate(req: Request, res: Response) {
  const candidates = await getAllCandidates();
  res.json(candidates);
}

export async function handleGetCandidateById(req: Request, res: Response) {
  const id = Number(req.params.id);
  const candidate = await getCandidateById(id);
  if (!candidate) {
    res.status(404).json({ error: "Candidate not found" });
    return;
  }
  res.json(candidate);
}

export async function handleDeleteCandidate(req: Request, res: Response) {
  const id = Number(req.params.id);
  const candidate = await deleteCandidate(id);
  if (!candidate) {
    res.status(404).json({ error: "Candidate not found" });
    return;
  }
  res.json({ message: "Candidate deleted", candidate });
}
