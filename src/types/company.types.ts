export interface Company {
  id: number;
  name: string;
  industry: string | null;
  size: "startup" | "mid" | "enterprise" | null;
  location: string | null;
  website: string | null;
  created_at: Date;
  updated_at: Date;
}

export type CreateCompanyInput = Omit<
  Company,
  "id" | "created_at" | "updated_at"
>;

export type UpdateCompanyInput = Partial<CreateCompanyInput>;
