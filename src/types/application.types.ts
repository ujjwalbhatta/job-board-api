export interface Application {
  id: number;
  job_id: number;
  candidate_id: number;
  status: "pending" | "reviewed" | "rejected" | "accepted";
  cover_letter: string | null;
  applied_at: Date;
  updated_at: Date;
}

export type CreateApplicationInput = Omit<
  Application,
  "id" | "applied_at" | "updated_at"
>;

export type UpdateApplicationInput = Partial<CreateApplicationInput>;
