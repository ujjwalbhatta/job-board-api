import { Request, Response } from 'express';
import {
  getAllJobs,
  getJobById,
  getJobsByCompany,
  createJob,
  updateJob,
  deleteJob,
  addTagToJob,
  removeTagFromJob
} from '../queries/job.queries';

export async function handleGetAllJobs(req: Request, res: Response) {
  const jobs = await getAllJobs();
  res.json(jobs);
}

export async function handleGetJobById(req: Request, res: Response) {
  const id = Number(req.params.id);
  const job = await getJobById(id);
  if (!job) {
    res.status(404).json({ error: 'Job not found' });
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
    if (err.code === '23503') {
      res.status(404).json({ error: 'Company not found' });
      return;
    }
    throw err;
  }
}

export async function handleUpdateJob(req: Request, res: Response) {
  const id = Number(req.params.id);
  const job = await updateJob(id, req.body);
  if (!job) {
    res.status(404).json({ error: 'Job not found' });
    return;
  }
  res.json(job);
}

export async function handleDeleteJob(req: Request, res: Response) {
  const id = Number(req.params.id);
  const job = await deleteJob(id);
  if (!job) {
    res.status(404).json({ error: 'Job not found' });
    return;
  }
  res.json({ message: 'Job deleted', job });
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