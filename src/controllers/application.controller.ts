import { Request, Response } from "express";
import {
  createApplication,
  updateApplication,
  getAllApplication,
  getApplicationById,
  deleteApplication,
} from "../queries/application.queries";

export async function handleCreateApplication(req: Request, res: Response) {
  try {
    const application = await createApplication(req.body);
    res.status(201).json(application);
  } catch (err: any) {
    if (err.code === "23503") {
      res.status(404).json({ error: "Job or candidate not found" });
      return;
    }
    throw err;
  }
}
export async function handleUpdateApplication(req: Request, res: Response) {
  const id = Number(req.params.id);

  const application = await updateApplication(id, req.body);

  if (!application) {
    res.status(404).json({ error: "Application not found" });
    return;
  }

  res.json(application);
}

export async function handleGetAllApplication(req: Request, res: Response) {
  const applications = await getAllApplication();
  res.json(applications);
}

export async function handleGetApplicationById(req: Request, res: Response) {
  const id = Number(req.params.id);
  const application = await getApplicationById(id);
  if (!application) {
    res.status(404).json({ error: "Application not found" });
    return;
  }
  res.json(application);
}

export async function handleDeleteApplication(req: Request, res: Response) {
  const id = Number(req.params.id);
  const application = await deleteApplication(id);
  if (!application) {
    res.status(404).json({ error: "Application not found" });
    return;
  }
  res.json({ message: "Application deleted", application });
}
