import { Tag } from "./tag.types";

export interface Job {
  id: number;
  company_id: number;
  title: string;
  description: string | null;
  salary_min: number | null;
  salary_max: number | null;
  job_type: "full-time" | "part-time" | "contract" | "internship" | null;
  remote: boolean;
  status: "open" | "closed" | "draft";
  posted_at: Date;
  expires_at: Date | null;
  seats: number;
  updated_at: Date;
}

export type CreateJobInput = Omit<
  Job,
  "id" | "posted_at" | "updated_at" 
>;

export type UpdateJobInput = Partial<CreateJobInput>;

export interface JobWithCompany extends Job {
  company_name: string
  company_industry: string | null
}

export interface JobDetail extends JobWithCompany {
  tags: Tag[]
}