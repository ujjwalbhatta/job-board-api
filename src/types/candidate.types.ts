export interface Candidate {
    id: number
    name: string
    email: string
    phone: string | null
    skills: string[] | null
    bio: string | null
    created_at: Date
    updated_at: Date
  }
  
  export type CreateCandidateInput = Omit<Candidate, 'id' | 'created_at' | 'updated_at'>
  
  export type UpdateCandidateInput = Partial<CreateCandidateInput>
  
