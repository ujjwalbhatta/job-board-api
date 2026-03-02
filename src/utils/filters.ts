// src/utils/filters.ts

import { Request } from 'express';
import { JobFilterParams } from '../types/job.types';

const VALID_JOB_TYPES = ['full-time', 'part-time', 'contract', 'internship'];
const VALID_STATUSES  = ['open', 'closed', 'draft'];

export function validateJobFilters(req: Request): 
  { filters: JobFilterParams } | { error: string; status: number } {
  
  const { search, remote, job_type, status, salary_min, salary_max, tags } = req.query;

  if (job_type && !VALID_JOB_TYPES.includes(job_type as string)) {
    return {
      error: `Invalid job_type. Valid values: ${VALID_JOB_TYPES.join(', ')}`,
      status: 400
    };
  }

  if (status && !VALID_STATUSES.includes(status as string)) {
    return {
      error: `Invalid status. Valid values: ${VALID_STATUSES.join(', ')}`,
      status: 400
    };
  }

  const filters: JobFilterParams = {
    search:     typeof search   === 'string' ? search : undefined,
    remote:     remote === 'true' ? true : remote === 'false' ? false : undefined,
    job_type:   typeof job_type === 'string' ? job_type as JobFilterParams['job_type'] : undefined,
    status:     typeof status   === 'string' ? status  as JobFilterParams['status']   : undefined,
    salary_min: salary_min ? Number(salary_min) : undefined,
    salary_max: salary_max ? Number(salary_max) : undefined,
    tags:       typeof tags === 'string' ? tags.split(',').map(t => t.trim()) : undefined,
  };

  return { filters };
}