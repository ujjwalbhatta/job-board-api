import { Request, Response } from "express";
import {
  updateApplication,
  getAllApplication,
  getApplicationById,
  deleteApplication,
} from "../queries/application.queries";

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



