import { Request, Response } from "express";
import {
  getAllJobs,
  getJobById,
  getJobsByCompany,
  createJob,
  updateJob,
  deleteJob,
  addTagToJob,
  removeTagFromJob,
  applyJob,
} from "../queries/job.queries";
import { getPagination } from "../utils/pagination";
import { validateJobFilters } from "../utils/filters";

export async function handleGetAllJobs(
  req: Request,
  res: Response
): Promise<void> {
  const validated = validateJobFilters(req);

  if ("error" in validated) {
    res.status(validated.status).json({ error: validated.error });
    return;
  }

  const pagination = getPagination(req);
  const result = await getAllJobs(validated.filters, pagination);
  res.json(result);
}

export async function handleGetJobById(req: Request, res: Response) {
  const id = Number(req.params.id);
  const job = await getJobById(id);
  if (!job) {
    res.status(404).json({ error: "Job not found" });
    return;
  }
  res.json(job);
}

export async function handleGetJobsByCompany(req: Request, res: Response) {
  const company_id = Number(req.params.companyId);
  const jobs = await getJobsByCompany(company_id);
  res.json(jobs);
}

export async function handleCreateJob(req: Request, res: Response) {
  try {
    const job = await createJob(req.body);
    res.status(201).json(job);
  } catch (err: any) {
    if (err.code === "23503") {
      res.status(404).json({ error: "Company not found" });
      return;
    }
    throw err;
  }
}

export async function handleUpdateJob(req: Request, res: Response) {
  const id = Number(req.params.id);
  const job = await updateJob(id, req.body);
  if (!job) {
    res.status(404).json({ error: "Job not found" });
    return;
  }
  res.json(job);
}

export async function handleDeleteJob(req: Request, res: Response) {
  const id = Number(req.params.id);
  const job = await deleteJob(id);
  if (!job) {
    res.status(404).json({ error: "Job not found" });
    return;
  }
  res.json({ message: "Job deleted", job });
}

export async function handleAddTagToJob(req: Request, res: Response) {
  const job_id = Number(req.params.id);
  const tag_id = Number(req.params.tagId);
  await addTagToJob(job_id, tag_id);
  res.status(204).send();
}

export async function handleRemoveTagFromJob(req: Request, res: Response) {
  const job_id = Number(req.params.id);
  const tag_id = Number(req.params.tagId);
  await removeTagFromJob(job_id, tag_id);
  res.status(204).send();
}

export async function handleApplyJob(req: Request, res: Response) {
  try {
    const jobId = Number(req.params.id)
    const application = await applyJob(jobId, req.body)
    res.status(201).json(application)
  } catch (err: any) {
    if (err.message === 'JOB_NOT_FOUND') {
      res.status(404).json({ error: 'Job not found or not open' })
      return
    }
    if (err.message === 'JOB_FULL') {
      res.status(409).json({ error: 'No seats available' })
      return
    }
    if (err.code === '23505') {
      res.status(409).json({ error: 'Already applied to this job' })
      return
    }
    if (err.code === '23503') {
      res.status(404).json({ error: 'Candidate not found' })
      return
    }
    throw err
  }
}