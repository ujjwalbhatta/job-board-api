import { Router } from "express";
import {
  handleCreateCompany,
  handleDeleteCompany,
  handleGetAllCompanies,
  handleGetCompanyById,
  handleUpdateCompany,
} from "../controllers/company.controller";

const router = Router();

router.post("/", handleCreateCompany);
router.patch("/:id", handleUpdateCompany);
router.get("/", handleGetAllCompanies);
router.get("/:id", handleGetCompanyById);
router.delete("/:id", handleDeleteCompany);

export default router;
