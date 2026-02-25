import { createCompany } from "../queries/company.queries";
import { Request, Response } from "express";

export async function handleCreateCompany(req: Request, res: Response) {
    const company = await createCompany(req.body)
    res.status(201).json(company)
}