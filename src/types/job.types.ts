export interface Jobs {
    id: number
    company_id: number
    title: string
    description: string | null
    salary_min: number | null
    salary_max: number | null
    job_type: 'full-time'|'part-time'|'contract'|'internship'| null
    remote: boolean
    status: 'open'|'closed'|'draft'
    posted_at: Date
    expires_at: Date | null
    seats: number
    updated_at: Date
}

export type CreateJobInput = Omit<Jobs, 'id' | 'posted_at' | 'updated_at'| 'expires_at'>

export type UpdateJobInput = Partial<CreateJobInput>