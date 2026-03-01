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
} from "../queries/job.queries";
import { JobFilterParams } from "../types/job.types";

const VALID_JOB_TYPES = ["full-time", "part-time", "contract", "internship"];
const VALID_JOB_STATUS = ["open", "closed", "draft"];

export async function handleGetAllJobs(req: Request, res: Response) {
  const { search, remote, job_type, status, salary_min, salary_max, tags } =
    req.query;

  if (job_type && !VALID_JOB_TYPES.includes(job_type as string)) {
    return res.status(400).json({
      error: `Invalid job_type. Valid values: ${VALID_JOB_TYPES.join(", ")}`,
    });
  }

  if (status && !VALID_JOB_STATUS.includes(status as string)) {
    return res.status(400).json({
      error: `Invalid job_status. Valid values: ${VALID_JOB_STATUS.join(", ")}`,
    });
  }

  //type narrowing
  const filters: JobFilterParams = {
    search: typeof search === "string" ? search : undefined,
    remote: remote === "true" ? true : remote === "false" ? false : undefined,
    job_type:
      typeof job_type === "string"
        ? (job_type as JobFilterParams["job_type"])
        : undefined,
    status:
      typeof status === "string"
        ? (status as JobFilterParams["status"])
        : undefined,
    salary_max: salary_max ? Number(salary_max) : undefined,
    salary_min: salary_min ? Number(salary_min) : undefined,
    tags:
      typeof tags === "string"
        ? tags.split(",").map((i) => i.trim())
        : undefined,
  };

  const jobs = await getAllJobs(filters);

  res.json(jobs);
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
