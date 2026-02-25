import { createCompany, deleteCompany, getAllCompanies, getCompanyById, updateCompany } from "../queries/company.queries";
import { Request, Response } from "express";

export async function handleCreateCompany(req: Request, res: Response) {
  const company = await createCompany(req.body);
  res.status(201).json(company);
}

export async function handleUpdateCompany(req: Request, res: Response) {
  const id = Number(req.params.id);

  const company = await updateCompany(id, req.body);

  if (!company) {
    return res.status(404).json({ error: "Company not found" });
  }

  res.json(company);
}

export async function handleGetAllCompanies(req: Request, res: Response) {
  const companies = await getAllCompanies();
  res.json(companies);
}

export async function handleGetCompanyById(req: Request, res: Response) {
  const id = Number(req.params.id);
  const company = await getCompanyById(id);
  if (!company) {
    res.status(404).json({ error: 'Company not found' });
    return;
  }
  res.json(company);
}

export async function handleDeleteCompany(req: Request, res: Response) {
  const id = Number(req.params.id);
  const company = await deleteCompany(id);
  if (!company) {
    res.status(404).json({ error: 'Company not found' });
    return;
  }
  res.json({ message: 'Company deleted', company });
}